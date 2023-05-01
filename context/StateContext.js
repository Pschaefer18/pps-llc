import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast'; 

const Context = createContext();

export const StateContext = ({ children }) => {
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [adjustedPrice, setAdjustedPrice] = useState(0)
    const [discounts, setDiscounts] = useState({
        bulkSingles: 0,
        nativeBulkSingles: 0,
        bulk24Packs: 0,
        nativeBulk24Packs:0,
        bulk48Packs: 0,
        nativeBulk48Packs: 0,
    });
    const [totalQuantities, setTotalQuantities] = useState(0);
    const [qty, setQty] = useState(1);
    const [customerInfo, setCustomerInfo] = useState({})

    useEffect(() => {
        var cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart = cart.filter(item => item != null)
        setCartItems(cart)
        const localCustomerInfo = JSON.parse(localStorage.getItem('customerInfo')) || [];
        setCustomerInfo(localCustomerInfo)
        var price = 0
        cart && cart.map((item) => {
            price += item.price * item?.quantity
        })
        setTotalPrice(price)
      }, []);

    useEffect(() => {
        var singles = 0
        var nativeSingles = 0
        var packs = 0
        var nativePacks = 0
        cartItems && cartItems.map((item) => {
            if (item.option == "Single") {
                if (item.category == "native") {
                    nativeSingles += 1 * item.quantity
                } else {
                    singles += 1 * item.quantity
                }
            }
            if (item.option == "Four pack") {
                if (item.category == "native") {
                    nativePacks += 4 * item.quantity
                } else {
                    packs += 4 * item.quantity
                }
            }
            if (item.option == "Eight pack") {
                if (item.category == "native") {
                    nativePacks += 8 * item.quantity
                } else {
                    packs += 8 * item.quantity
                }
            }
        })
        setDiscounts({
            bulkSingles: Math.floor(singles / 18),
            nativeBulkSingles: Math.floor(nativeSingles / 18),
            bulk24Packs: Math.floor((packs / 24)) % 2,
            nativeBulk24Packs: Math.floor((nativePacks / 24)) % 2,
            bulk48Packs: Math.floor((packs / 48)),
            nativeBulk48Packs: Math.floor((nativePacks / 48)),
        })
        localStorage.setItem('cart', JSON.stringify(cartItems))
      }, [cartItems]);
      useEffect(() => {
        //apply discounts
        const {bulkSingles, nativeBulkSingles, bulk24Packs, nativeBulk24Packs, bulk48Packs, nativeBulk48Packs} = discounts
        console.log(totalPrice)
        console.log(discounts)
        console.log(totalPrice - (bulkSingles * 12 + nativeBulkSingles * 18 + bulk24Packs * 4 + nativeBulk24Packs * 6 + bulk48Packs * 13 + nativeBulk48Packs * 22))
        setAdjustedPrice(totalPrice - (bulkSingles * 12 + nativeBulkSingles * 18 + bulk24Packs * 4 + nativeBulk24Packs * 6 + bulk48Packs * 13 + nativeBulk48Packs * 22))
      }, [discounts])
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
                setAdjustedPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price)
            } else if(value == 'dec' && foundProduct.quantity > 0) {
                newCartItems.splice(index, 0, {...foundProduct, quantity: foundProduct.quantity - 1})
                setCartItems([...newCartItems])
                setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price)
                setAdjustedPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price)
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
                discounts,
                adjustedPrice,
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