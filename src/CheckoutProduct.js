import React from 'react';
import './CheckoutProduct.css'
import {useStateValue} from './StateProvider'

const CheckoutProduct = ({ image, id, price, title, rating }) => {
    const [{ },dispatch] = useStateValue()
    const onRemoveFromBasket = () => {
        dispatch({
            type: "REMOVE_FROM_BASKET",
            id:id
              })
    }
    return (
        <div className="checkoutProduct">
            <img className="product__image" src={image} alt="" />
            <div className="product__info">

            <p className="checkoutProduct__title">{title}</p>
            <p className="product__price">
                <small>Ghc </small>
                <strong>{price}</strong>
            </p>

            <div  className="checkoutProduct_rating">
                {Array(rating).fill().map((_) => (<p>⭐️</p>))}
               
                </div>
                <button className="checkoutProduct__buttom" onClick={onRemoveFromBasket}>remove busket</button>
            </div>
           
            
           
           


        </div>
    );
}
 

 
export default CheckoutProduct;