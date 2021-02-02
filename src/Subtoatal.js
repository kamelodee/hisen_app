import React from 'react';
import './Subtotal.css'
import CurrencyFormat from 'react-currency-format';

import {useStateValue} from './StateProvider'
 import {getBasketTotal} from './Reducer'
const Subtotal = () => {
    const [{ basket }, dispatch] = useStateValue()

    console.log(getBasketTotal(basket));
    return (
        <div className="subtotal">
            <CurrencyFormat
                renderText={(value) => (
                    <>
                    <p>
                        subtotal ({basket?.length} items): <strong>{value}</strong>
                    </p>
                       <small className="subtotal__gift">
                            <input type="checkbox" name="" id="" />
                            this order contains gift
                        </small>
                        </>
                )}
                decimalScale={2}
                value={getBasketTotal(basket)}
                displayType={'text'}
                thousandSeperator={true}
                prefix={'Ghc '}
            />
            <button>preced to checkout</button>
        </div>
    );
}
 

 
export default Subtotal;