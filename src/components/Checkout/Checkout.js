import { useState, useContext } from "react";
import { CartContext } from "../../Context/CartContext";
import { db } from "../../services/firebase/firebaseConfig";
import { documentId, Timestamp, writeBatch, getDocs, query, where } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
import CheckoutForm from "../CheckoutForm/CheckoutForm";
import Loader from "../Loader";
import './Checkout.css'
import { NavLink, Link } from 'react-router-dom';
import { Button } from "react-bootstrap";
import CartWidget from "../CartWidget/CartWidget";


const Checkout = () => {
    
    const [loading, setLoading] = useState(false);
    const [orderId, setOrderId] = useState('');
    

    const {cart, total, clearCart} = useContext(CartContext);

    const createOrder = async (userData) => {
        const {name, phone, email} = userData;
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
            <Link to={`/cart`}><Button className="btnBoostrap">Seguir comprando</Button></Link>
        </div>)

    }
    
    return (
        <div>
            <h1 className="CheckoutTitle">Gracias por tu pedido</h1>
            <CheckoutForm onConfirm={createOrder}/>
        </div>
    )
}


export default Checkout