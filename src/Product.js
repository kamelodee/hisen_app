import React from 'react';
import {useStateValue} from './StateProvider'
 import './Product.css'
const Product = ({ id, title, price, rating, image ,byhisense}) => {
    const [{ },dispatch] = useStateValue()
    const addToBasket = () => {
        dispatch({
            type: "ADD_TO_BASKET",
            item: {
                id,
                title,
                price,
                rating,
                image,
                byhisense
            }
        })
    }
    return (
        <div key={id} className="product"> 
          <img src={image} alt=""/>
            <div className="product__info">
            <h3 className="product__title">{title}</h3>
            <h4>{byhisense}</h4>
            <h3 className="product__price">
                Ghc
                {price}
            </h3>
           
            </div>
           
           
              
           <button onClick={addToBasket}>add to busket</button>
        </div>
    );
}
 

 
export default Product;