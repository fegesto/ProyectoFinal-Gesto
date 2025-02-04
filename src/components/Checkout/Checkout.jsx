import { useState, useContext } from "react";
import { CartContext } from "../../Context/CartContext";
import { db } from "../../services/firebase/firebaseConfig";
import { documentId, Timestamp, writeBatch, getDocs, query, where } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
import CheckoutForm from "../CheckoutForm/CheckoutForm";
import Loader from "../Loader";
import './Checkout.css'
import {Link } from 'react-router-dom';
import { Button } from "react-bootstrap";


const Checkout = () => {
    
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [orderId, setOrderId] = useState('');
    const {totalQuantity} = useContext(CartContext);
    

    const {cart, total, clearCart} = useContext(CartContext);

    const createOrder = async (userData) => {
        const {name, phone, email} = userData;
        setEmail(email);
        setLoading(true);

        try{

            
            const objOrder ={
                buyer: { name, phone, email},
                items: cart,
                total: total,
                date: Timestamp.fromDate(new Date())
            }
            
            const batch = writeBatch(db);
            const outOfStock = [];

            const ids = cart.map(prod => prod.id);

            const productsRef = collection(db, 'products');
            

            const productsAddedFromFirestore = await getDocs(query(productsRef, where(documentId(), 'in', ids)));
            

            const {docs} = productsAddedFromFirestore
            

            docs.forEach(doc => {
                const dataDoc = doc.data();
                const stockDb = dataDoc.stock;

                const productAddedToCart = cart.find(prod => prod.id === doc.id);
                const prodQuantity = productAddedToCart?.quantity;

                if(stockDb >= prodQuantity){
                    batch.update(doc.ref, {
                        stock: stockDb - prodQuantity
                    })
                    }else {
                        outOfStock.push({id: doc.id, ...dataDoc})
                    }
                });

                if(outOfStock.length === 0){
                    await batch.commit()
                    const orderRef = collection(db, 'orders');
                    const orderAdded = await addDoc(orderRef, objOrder);
                    setOrderId(orderAdded.id);
                    clearCart();
                }else{
                    console.log('hay productos fuera de stock');
                }
            }
        catch(error){
            console.log(error);
        } finally{
            setLoading(false);
        }
    };

    if(loading){
        return(
        <div>
            <h1 className="CheckoutTitle">Estamos procesando tu pedido</h1>
            <Loader/>
        </div>
        )
    }
    
    if(orderId){
        return (
        <div>
            <h1 className="CheckoutTitle">Tu numero de pedidio es:</h1>
            <h1 className="CheckoutSubTitle">{orderId}</h1>
            <h2>Nos vamos a contactar a tu mail {email} para coordinar la entrega</h2>
            <img className="CheckoutImg" src="https://res.cloudinary.com/dq7dgycv9/image/upload/v1738631640/pngwing.com_paxg22.png"></img>
            <br></br>
            <Link to={`/cart`}><Button className="btnBoostrap">Seguir comprando</Button></Link>
        </div>)

    }

    if(totalQuantity<1){
        return(
            <div className="EmptyCartContainer">
            <h1>Parece que no tenes productos en el carrito</h1>
            <img src="https://res.cloudinary.com/dq7dgycv9/image/upload/v1738534686/transparent-icon-sad-shopping-bag-worried-shopping-bag-torn-sh-sad-wrinkled-empty-shopping-bag-hanging-on-wall6591176ca221a6.7145983617040075326641_wdwfmz.png"></img>
            <Link to='/' className='Option'>Empezar a comprar</Link>
        </div>
        )
    }
    
    return (
        <div>
            <h1 className="CheckoutTitle">Gracias por tu pedido</h1>
            <CheckoutForm onConfirm={createOrder}/>
        </div>
    )
}


export default Checkout