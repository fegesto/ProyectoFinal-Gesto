import { useState, useEffect } from "react";
import { getProducts, getProductsByCategory } from "../../asyncMock";
import ItemList from "../ItemList/ItemList";
import { useParams } from "react-router-dom";

const ItemListContainer = ({greeting}) => {
    const [products, setProducts] = useState([]);

    const { categoryId } = useParams();

    useEffect(() => {

        const asyncFunc = categoryId ? getProductsByCategory : getProducts;

        asyncFunc(categoryId)
            .then(res => setProducts(res))
            .catch(err => console.log(err))
    }, [categoryId])

    
    return (
        <div>
            <h1>{greeting}</h1>
            <ItemList products={products}/>
        </div>
    )
}

export default ItemListContainer