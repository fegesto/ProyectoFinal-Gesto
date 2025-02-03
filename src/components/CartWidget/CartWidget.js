import cart from './assets/cart.svg'
import { useContext } from "react";
import { CartContext } from '../../Context/CartContext';
import { Link } from 'react-router-dom';
import './CartWidget.css'


const CartWidget = () => {

    const {totalQuantity} = useContext(CartContext);

    return(
        <Link to='/cart' className='CartWidget'>
            <div className='CartWidgetContainer'>
                <img src={cart} width='30px'  alt='Imagen de carrito'/>
                <p>{totalQuantity}</p>
            </div>
        </Link>
    )
}

export default CartWidget