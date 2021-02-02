import React from 'react';
import {useStateValue} from '../../StateProvider'
 import './Category.css'
const Category = ({ id, link,image,title}) => {
    const [{ },dispatch] = useStateValue()
    const addToBasket = () => {
        dispatch({
            type: "ADD_TO_BASKET",
            item: {
                id,
                link,
                title
            }
        })
    }
    return (
        <div key={id} className="product"> 
          <img src={image} alt=""/>
            <div className="product__info">
           <h4>{title}</h4>
           
            </div>
           
           
        </div>
    );
}
 

 
export default Category;