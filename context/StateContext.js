import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast'; 

const Context = createContext();

export const StateContext = ({ children }) => {
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantities, setTotalQuantities] = useState(0);
    const [qty, setQty] = useState(1);

    const onAdd = (product, quantity, option) => {
        const checkProductInCart = cartItems.find((item) => item._id === product._id && item.option == option);
        const price = product.pricing_options.find((opt) => opt.option == option).price
        setTotalPrice((prevTotalPrice) => prevTotalPrice + price * quantity)
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity)

        if(checkProductInCart) {

            const updatedCartItems = cartItems.map((cartProduct => {
                if(cartProduct._id === product._id) return {
                    ...cartProduct,
                    quantity: cartProduct.quantity + quantity,
                }
            }))

            setCartItems(updatedCartItems);
            console.log(updatedCartItems)
        } else {
            product.quantity = quantity;
            product.price = price
            product.option = option
            setCartItems([...cartItems, { ...product }]);
        }
        toast.success(`${qty} ${product.name} added to the cart.`);
    }
    const onRemove = (index, value) => {
        const newCartItems = cartItems;
        newCartItems.splice(index, 1);
        setTotalPrice((prevTotalPrice) => prevTotalPrice - value)
        setCartItems([...newCartItems])
    }
    const incQty = () => {
        setQty((prevQty) => prevQty + 1);
    }

    const decQty = () => {
        setQty((prevQty) => {
            if (prevQty - 1 < 1) return 1;
  
            return prevQty - 1;
        })
    }
    const toggleCartItemQty = (id, value, option) => {
            const foundProduct = cartItems.find((item) => item._id == id && item.option == option)
            const index = cartItems.findIndex(item => item._id == id && item.option == option)
            const newCartItems = cartItems.filter((item) => item._id !== id || item.option !== option)
            console.log(newCartItems)
            if(value == 'inc') {
                newCartItems.splice(index, 0, {...foundProduct, quantity: foundProduct.quantity + 1})
                setCartItems([...newCartItems])
                setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price)
            } else if(value == 'dec' && foundProduct.quantity > 0) {
                newCartItems.splice(index, 0, {...foundProduct, quantity: foundProduct.quantity - 1})
                setCartItems([...newCartItems])
                setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price)
            }
            
    }

    return (
        <Context.Provider
            value = {{
                showCart,
                cartItems,
                totalPrice,
                totalQuantities,
                qty,
                incQty,
                decQty,
                onAdd,
                onRemove,
                setShowCart,
                toggleCartItemQty
            }}
        >
            {children}
        </Context.Provider>
    )
}
export const useStateContext = () => useContext(Context)