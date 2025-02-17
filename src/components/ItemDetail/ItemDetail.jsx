import ItemCount from "../ItemCount/ItemCount";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { CartContext } from "../../Context/CartContext";

const ItemDatail = ({id, name, img, category, description, price, stock}) => {

    const [quantityAdded, setQuantityAdded] = useState(0);
    const {addItem} = useContext(CartContext);

    const handleOnAdd = (quantity) => {
        setQuantityAdded(quantity);

        const item = {
            id, name, price
        }

        addItem(item, quantity);
    }

    return(
        <article className = "CardItem">
            <header className="Header">
                <h2 className="ItemHeader">
                    {name}
                </h2>
            </header>
            <picture>
                <img src={img} alt={name} className="ItemImg"/>
            </picture>
            <section>
                <p className = "Info">
                    Categoria: {category}    
                </p>
                <p className = "Info">
                    Descripcion: {description}    
                </p>
                <p className = "Info">
                    Precio: ${price}    
                </p>
            </section>
            <footer className='ItemFooter'>
            <div className = "Info">
                {
                    stock === 0 ? (
                        <p className="OutOfStock">Producto agotado 😥</p>
                    ) :
                    quantityAdded > 0 ? (
                        <Link to={`/cart`} className='Option'>Finalizar compra</Link>
                    ) :
                    <ItemCount initial={1} stock={stock} onAdd={handleOnAdd}/>
                }            
            </div>
            </footer>
        </article>
    )
}
export default ItemDatail