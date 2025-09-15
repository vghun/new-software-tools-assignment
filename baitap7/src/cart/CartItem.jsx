import React, { useContext } from "react";
import { CartContext } from "./CartProvider";
import Button from "../components/button";

const CartItem = ({ item }) => {
  const { updateItem, removeItem } = useContext(CartContext);
  return (
    <div className="cart-item">
      <span>{item.name}</span>
      <input
        type="number"
        value={item.qty}
        onChange={(e) => updateItem(item.id, Number(e.target.value))}
      />
      <Button onClick={() => removeItem(item.id)}>Remove</Button>
    </div>
  );
};

export default CartItem;
