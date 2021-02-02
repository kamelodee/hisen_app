import React from 'react';
import Product from './Product'
import Category from './components/Category/Category'
 import './Home.css'
const Home = () => {
    return (
        <div>
            <img
                className="home__image"
                
                src="https://hisense2-myapptino-assets.s3.eu-west-2.amazonaws.com/app_assets/company_images/1/homepage/Sliders_1200x400b_1603253846203.jpg" alt="" />
          <h3 className="category__title">Top Categories</h3>
            <div className="home__row top__category">
           
                 <Category
               title="Refrigrators"
                id={1}
                    image="https://hisense2-myapptino-assets.s3.eu-west-2.amazonaws.com/app_assets/company_images/1/homepage/Images_515x512_525_1603253916573_1609906232435.png" />
                 <Category
               title="Air Conditioner"
                id={2}
             image="https://hisense2-myapptino-assets.s3.eu-west-2.amazonaws.com/app_assets/company_images/1/homepage/Images_515x512_ac_on%26off1_1603253920835_1609906235444.png"/>
           
                 <Category
             title="Televitions"
                id={2}
             image="https://hisense2-myapptino-assets.s3.eu-west-2.amazonaws.com/app_assets/product_images/Hisense/195/Images_515x512_43smart.png"/>
           
           </div>
            
            <div className="home__row home__product">
            <Product
                title="TV Hisense 43 Smart Digital Satellite Television "
                price={90}
                rating={5}
                byhisense="By Hisense"
                id={3}
                    image="https://hisense2-myapptino-assets.s3.eu-west-2.amazonaws.com/app_assets/product_images/Hisense/204/Product_600x600_58.png" />
                 <Product
                title="TV Hisense 80 Smart Digital Satellite 4K Laser Television"
                price={12}
                byhisense="By Hisense"
                rating={5}
                id={4}
                    image="https://hisense2-myapptino-assets.s3.eu-west-2.amazonaws.com/app_assets/product_images/Hisense/204/Product_600x600_58.png" />
                 <Product
                title="TV Hisense 70 Smart 4K T2 Television"
                price={400}
                rating={4}
                byhisense="By Hisense"
                id={5}
             image="https://hisense2-myapptino-assets.s3.eu-west-2.amazonaws.com/app_assets/product_images/Hisense/212/Images_515x512_80.jpg"/>
            <Product
                title=" TV Hisense 70 Smart 4K T2 Television"
                price={90}
                rating={5}
                byhisense="By Hisense"
                id={3}
                    image="https://hisense2-myapptino-assets.s3.eu-west-2.amazonaws.com/app_assets/product_images/Hisense/195/Images_515x512_43smart.png" />
                 <Product
                title="TV Hisense 80 Smart Digital Satellite 4K Laser Television"
                price={12}
                rating={5}
                byhisense="By Hisense"
                id={4}
                    image="https://hisense2-myapptino-assets.s3.eu-west-2.amazonaws.com/app_assets/product_images/Hisense/208/Images_515x512_smart.png" />
                 <Product
                title="TV Hisense 70 Smart 4K T2 Television"
                price={400}
                rating={4}
                byhisense="By Hisense"
                id={5}
             image="https://hisense2-myapptino-assets.s3.eu-west-2.amazonaws.com/app_assets/product_images/Hisense/211/Images_515x512_curve.png"/>
           </div>


           <img
                className="home__image"
                src="https://hisense2-myapptino-assets.s3.eu-west-2.amazonaws.com/app_assets/company_images/1/homepage/Sliders_1200x400_1603254187914.jpg" alt="" />
           
           

           <div className="home__row">
            <Product
                title=" TV Hisense 43 Smart Digital Satellite Television"
                price={90}
                rating={5}
                byhisense="By Hisense"
                id={3}
                    image="https://hisense2-myapptino-assets.s3.eu-west-2.amazonaws.com/app_assets/product_images/Hisense/204/Product_600x600_58.png" />
                 <Product
                title=" TV Hisense 80 Smart Digital Satellite 4K Laser Television"
                price={12}
                rating={5}
                byhisense="By Hisense"
                id={4}
                    image="https://hisense2-myapptino-assets.s3.eu-west-2.amazonaws.com/app_assets/product_images/Hisense/204/Product_600x600_58.png" />
                 <Product
                title="TV Hisense 70 Smart 4K T2 Television"
                price={400}
                rating={4}
                byhisense="By Hisense"
                id={5}
             image="https://hisense2-myapptino-assets.s3.eu-west-2.amazonaws.com/app_assets/product_images/Hisense/212/Images_515x512_80.jpg"/>
            <Product
                title=" TV Hisense 43 Smart Digital Satellite Television"
                price={90}
                rating={5}
                byhisense="By Hisense"
                id={3}
                    image="https://hisense2-myapptino-assets.s3.eu-west-2.amazonaws.com/app_assets/product_images/Hisense/195/Images_515x512_43smart.png" />
                 <Product
                title="TV Hisense 80 Smart Digital Satellite 4K Laser Television"
                price={12}
                rating={5}
                byhisense="By Hisense"
                id={4}
                    image="https://hisense2-myapptino-assets.s3.eu-west-2.amazonaws.com/app_assets/product_images/Hisense/208/Images_515x512_smart.png" />
                 <Product
                title="TV Hisense 78 Curve Smart 4K T2 Television"
                price={400}
                rating={4}
                byhisense="By Hisense"
                id={5}
             image="https://hisense2-myapptino-assets.s3.eu-west-2.amazonaws.com/app_assets/product_images/Hisense/211/Images_515x512_curve.png"/>
           </div>

           <div className="home__row">
            <Product
                title=" TV Hisense 43 Smart Digital Satellite Television"
                price={90}
                rating={5}
                byhisense="By Hisense"
                id={3}
                    image="https://hisense2-myapptino-assets.s3.eu-west-2.amazonaws.com/app_assets/product_images/Hisense/204/Product_600x600_58.png" />
                 <Product
                title="TV Hisense 78 Curve Smart 4K T2 Television"
                price={12}
                rating={5}
                byhisense="By Hisense"
                id={4}
                    image="https://hisense2-myapptino-assets.s3.eu-west-2.amazonaws.com/app_assets/product_images/Hisense/204/Product_600x600_58.png" />
                 <Product
                title="TV Hisense 78 Curve Smart 4K T2 Television"
                price={400}
                rating={4}
                byhisense="By Hisense"
                id={5}
             image="https://hisense2-myapptino-assets.s3.eu-west-2.amazonaws.com/app_assets/product_images/Hisense/212/Images_515x512_80.jpg"/>
            <Product
                title=" TV Hisense 43 Smart Digital Satellite Television"
                price={90}
                rating={5}
                byhisense="By Hisense"
                id={3}
                    image="https://hisense2-myapptino-assets.s3.eu-west-2.amazonaws.com/app_assets/product_images/Hisense/195/Images_515x512_43smart.png" />
                 <Product
                title="TV Hisense 70 Smart 4K T2 Television"
                price={12}
                rating={5}
                byhisense="By Hisense"
                id={4}
                    image="https://hisense2-myapptino-assets.s3.eu-west-2.amazonaws.com/app_assets/product_images/Hisense/208/Images_515x512_smart.png" />
                 <Product
                title="TV Hisense 78 Curve Smart 4K T2 Television"
                price={400}
                rating={4}
                byhisense="By Hisense"
                id={5}
             image="https://hisense2-myapptino-assets.s3.eu-west-2.amazonaws.com/app_assets/product_images/Hisense/211/Images_515x512_curve.png"/>
           </div>

        </div>
    );
}
 

 
export default Home;