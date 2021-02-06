import React from 'react';
import {useStateValue} from '../../StateProvider'
import CheckoutProduct from './CheckoutProduct'
 import Subtotal from '../../Subtoatal'
import './Checkout.css'
const Checkout = () => {
    const [{basket }] = useStateValue()
    return (
        <div className="checkout">
            <div className="checkout__left">
            <img src="https://hisense2-myapptino-assets.s3.eu-west-2.amazonaws.com/app_assets/company_images/1/homepage/Sliders_1200x400b_1603253846203.jpg" alt="" className="checkout__ads"/>
        
        {basket?.length === 0 ?(
            <div>
                <h2>your basket is empty</h2>
        </div>
        ):(
        <div>
                    <h2 className="checkout__title"> Your Shopping Busket</h2>
                    {basket.map(item => (
                        <CheckoutProduct
                            id={item.id}
                            title={item.title}
                            image={item.image}
                            price={item.price}
                            rating={item.rating} />
                    ))}
        </div>
    )}
            </div>
            {basket.length > 0 && (
                <div className="checkout__right">
                <Subtotal/>
                </div>
            )}
        </div>
    );
}
 

 
export default Checkout;