import React from "react";
import { CartContext } from "../../Context/CartContext";
import { Button } from "react-bootstrap";
import './CartItem.css'

const CartItem = ({ name, price, quantity,id }) => {

    const { removeItem } = React.useContext(CartContext);

    const handleRemoveItem = () => {
        removeItem(id);
    };
    return (
        <div>
            <h3>{name}</h3>
        <div className="cartItemContainer">
                <div className="cartItem">
                    <p>Precio: ${price}</p>
                    <p>Cantidad: {quantity}</p>
                    <p>Subtotal: ${price * quantity}</p>
                </div>
            <Button onClick={handleRemoveItem} className="trashButton">🗑️</Button>
            </div>
        </div>
    );
};

export default CartItem;