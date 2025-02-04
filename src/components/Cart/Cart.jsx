import { useContext } from "react";
import { CartContext } from "../../Context/CartContext";
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import CartItem from "../CartItem/CartItem";
import './Cart.css';

const Cart = () => {
    const {cart, clearCart, totalQuantity, total} = useContext(CartContext);

    if (totalQuantity === 0) {
        return (
            <div className="EmptyCartContainer">
                <h1>Parece que no tenes productos en el carrito</h1>
                <img src="https://res.cloudinary.com/dq7dgycv9/image/upload/v1738534686/transparent-icon-sad-shopping-bag-worried-shopping-bag-torn-sh-sad-wrinkled-empty-shopping-bag-hanging-on-wall6591176ca221a6.7145983617040075326641_wdwfmz.png"></img>
                <Link to='/' className='Option'>Empezar a comprar</Link>
            </div>
        )
    }

    return (
        <div className="CartContainer">
            {cart.map(prod => <CartItem key={prod.id} {...prod}/>)}
            <h3>Total: ${total}</h3>
            <Button onClick={clearCart} className="cleanCart">Vaciar carrito</Button>
            <Link to='/checkout' className='Option'>Finalizar compra</Link>
        </div>
    )
}

export default Cart