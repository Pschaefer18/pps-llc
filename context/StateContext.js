import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast'; 

const Context = createContext();

export const StateContext = ({ children }) => {
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantities, setTotalQuantities] = useState(0);
    const [qty, setQty] = useState(1);
    const [customerInfo, setCustomerInfo] = useState({})

    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        setCartItems(cart)
        const localCustomerInfo = JSON.parse(localStorage.getItem('customerInfo')) || [];
        setCustomerInfo(localCustomerInfo)
        var price = 0
        cart && cart.map((item) => price += item.price * item.quantity)
        setTotalPrice(price)
      }, []);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems))
      }, [cartItems]);
    useEffect(() => {
      localStorage.setItem('customerInfo', JSON.stringify(customerInfo))
    }, [customerInfo]);

    const onAdd = (product, quantity, option) => {
        const checkProductInCart = cartItems.find((item) => item._id === product._id && item.option == option);
        const price = product.pricing_options.find((opt) => opt.option == option).price
        setTotalPrice((prevTotalPrice) => prevTotalPrice + price * quantity)
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity)
        var updatedCartItems = []
        if(checkProductInCart) {
            updatedCartItems = cartItems.map((cartProduct => {
                if(cartProduct._id === product._id) return {
                    ...cartProduct,
                    quantity: cartProduct.quantity + quantity,
                }
            }))
        } else {
            product.quantity = quantity;
            product.price = price
            product.option = option
            updatedCartItems = [...cartItems, { ...product }];
        }
        setCartItems(updatedCartItems);
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
    const resetQty = () => {
        setQty(1)
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
    const addCustomerInfo = (info) => {
        setCustomerInfo(info)
    }

    return (
        <Context.Provider
            value = {{
                showCart,
                cartItems,
                totalPrice,
                totalQuantities,
                qty,
                customerInfo,
                incQty,
                decQty,
                onAdd,
                onRemove,
                setShowCart,
                toggleCartItemQty,
                resetQty,
                addCustomerInfo,
                setCartItems
            }}
        >
            {children}
        </Context.Provider>
    )
}
export const useStateContext = () => useContext(Context)