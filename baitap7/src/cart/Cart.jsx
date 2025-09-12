// CartProvider.jsx
import React, { createContext, useState } from "react";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addItem = (item) => setCart(prev => [...prev, item]);
  const removeItem = (id) => setCart(prev => prev.filter(i => i.id !== id));
  const updateItem = (id, qty) =>
    setCart(prev => prev.map(i => i.id === id ? { ...i, qty } : i));

  return (
    <CartContext.Provider value={{ cart, addItem, removeItem, updateItem }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
