import cart from './assets/cart.svg'

const CartWidget = () => {
    return(
        <div>
            <img src={cart} width='30px'  alt='Imagen de carrito'/>
            0
        </div>
    )
}

export default CartWidget