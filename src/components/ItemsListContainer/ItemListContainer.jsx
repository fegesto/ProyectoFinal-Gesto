import { useState, useEffect } from "react";
import ItemList from "../ItemList/ItemList";
import { useParams } from "react-router-dom";
import {getDocs, collection, query, where} from 'firebase/firestore';
import { db } from "../../services/firebase/firebaseConfig";
import Loader from "../Loader";

const ItemListContainer = ({greeting}) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const { categoryId } = useParams();

    useEffect(() => {

        setLoading(true);

        const collectionRef = categoryId ? query(collection(db, 'products'), where('category', '==', categoryId))
        : collection(db, 'products');

        getDocs(collectionRef)
        .then (res => {
            const productsAdapted = res.docs.map(doc => {
                const data = doc.data();
                return {id: doc.id, ...data}
            })
            setProducts(productsAdapted);
        })
        .catch(err => console.log(err))
        .finally(() => setLoading(false));}
    , [categoryId])
    
    if (loading) {
        return <Loader/>
    }

    return (
        <div>
            <h1>{greeting}</h1>
            <ItemList products={products}/>
        </div>
    )
}

export default ItemListContainer