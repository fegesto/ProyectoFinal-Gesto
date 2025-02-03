import './ItemDetailContainer.css'
import { useState, useEffect } from "react";
import ItemDetail from "../ItemDetail/ItemDetail";
import { useParams } from "react-router-dom";
import { getDoc, doc } from 'firebase/firestore';
import { db } from "../../services/firebase/firebaseConfig";
import Loader from '../Loader';

const ItemDetailContainer = () => {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    const {itemId} = useParams();

    useEffect(() => {

        setLoading(true);

        const docRef = doc(db, 'products', itemId);

        getDoc(docRef)
            .then(res => {
                const data = res.data();
                const productAdapted = {id: res.id, ...data};
                setProduct(productAdapted);})

            .catch(err => console.log(err))
            .finally(() => setLoading(false));
        }, [itemId])

    if (loading) {
        return <Loader/>
    }
    return (
        <div className = 'ItemDetailContainer'>
            <ItemDetail {...product}/>
        </div>
    )
}

export default ItemDetailContainer