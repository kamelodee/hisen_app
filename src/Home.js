import React from 'react';
import Product from './components/Product/Product'
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
                productShortDescription="TV Hisense 43 Smart Digital Satellite Television "
                unitListPrice={90}
                brandsName=" Hisense"
                brandProductId={3}
                productIndexName={1}
                unitQuantity={6}
                unitOfMeasure="kg"
                packagingQuantity={12}
                minOrderQuantity={1}
                outerPackQty={12}
                packagingQty={12}
                defaultDiscountPrice={80}
                isDiscontinued={false}
                    image="https://hisense2-myapptino-assets.s3.eu-west-2.amazonaws.com/app_assets/product_images/Hisense/204/Product_600x600_58.png" />
                 <Product
               productShortDescription="TV Hisense 43 Smart Digital Satellite Television "
               unitListPrice={90}
               brandsName=" Hisense"
               brandProductId={3}
               productIndexName={1}
               unitQuantity={6}
               unitOfMeasure="kg"
               packagingQuantity={12}
               minOrderQuantity={1}
               outerPackQty={12}
               packagingQty={12}
               defaultDiscountPrice={80}
               isDiscontinued={false}
                    image="https://hisense2-myapptino-assets.s3.eu-west-2.amazonaws.com/app_assets/product_images/Hisense/204/Product_600x600_58.png" />
                 <Product
               productShortDescription="TV Hisense 43 Smart Digital Satellite Television "
               unitListPrice={90}
               brandsName=" Hisense"
               brandProductId={4}
               productIndexName={1}
               unitQuantity={6}
               unitOfMeasure="kg"
               packagingQuantity={12}
               minOrderQuantity={1}
               outerPackQty={12}
               packagingQty={12}
               defaultDiscountPrice={80}
               isDiscontinued={false}
             image="https://hisense2-myapptino-assets.s3.eu-west-2.amazonaws.com/app_assets/product_images/Hisense/212/Images_515x512_80.jpg"/>
            <Product
                productShortDescription="TV Hisense 43 Smart Digital Satellite Television "
                unitListPrice={90}
                brandsName=" Hisense"
                brandProductId={5}
                productIndexName={1}
                unitQuantity={6}
                unitOfMeasure="kg"
                packagingQuantity={12}
                minOrderQuantity={1}
                outerPackQty={12}
                packagingQty={12}
                defaultDiscountPrice={80}
                isDiscontinued={false}
                
                    image="https://hisense2-myapptino-assets.s3.eu-west-2.amazonaws.com/app_assets/product_images/Hisense/195/Images_515x512_43smart.png" />
                 <Product
               productShortDescription="TV Hisense 43 Smart Digital Satellite Television "
               unitListPrice={90}
               brandsName=" Hisense"
               brandProductId={6}
                    image="https://hisense2-myapptino-assets.s3.eu-west-2.amazonaws.com/app_assets/product_images/Hisense/208/Images_515x512_smart.png" />
                 <Product
               productShortDescription="TV Hisense 43 Smart Digital Satellite Television "
               unitListPrice={90}
               brandsName=" Hisense"
               brandProductId={7}
               productIndexName={1}
               unitQuantity={6}
               unitOfMeasure="kg"
               packagingQuantity={12}
               minOrderQuantity={1}
               outerPackQty={12}
               packagingQty={12}
               defaultDiscountPrice={80}
               isDiscontinued={false}
             image="https://hisense2-myapptino-assets.s3.eu-west-2.amazonaws.com/app_assets/product_images/Hisense/211/Images_515x512_curve.png"/>
           </div>


           <img
                className="home__image"
                src="https://hisense2-myapptino-assets.s3.eu-west-2.amazonaws.com/app_assets/company_images/1/homepage/Sliders_1200x400_1603254187914.jpg" alt="" />
           
           

           <div className="home__row">
            <Product
               productShortDescription="TV Hisense 43 Smart Digital Satellite Television "
               unitListPrice={90}
               brandsName=" Hisense"
               brandProductId={8}
               productIndexName={1}
                unitQuantity={6}
                unitOfMeasure="kg"
                packagingQuantity={12}
                minOrderQuantity={1}
                outerPackQty={12}
                packagingQty={12}
                defaultDiscountPrice={80}
                isDiscontinued={false}
                    image="https://hisense2-myapptino-assets.s3.eu-west-2.amazonaws.com/app_assets/product_images/Hisense/204/Product_600x600_58.png" />
                 <Product
               productShortDescription="TV Hisense 43 Smart Digital Satellite Television "
               unitListPrice={90}
               brandsName=" Hisense"
               brandProductId={9}
               productIndexName={1}
               unitQuantity={6}
               unitOfMeasure="kg"
               packagingQuantity={12}
               minOrderQuantity={1}
               outerPackQty={12}
               packagingQty={12}
               defaultDiscountPrice={80}
               isDiscontinued={false}
                    image="https://hisense2-myapptino-assets.s3.eu-west-2.amazonaws.com/app_assets/product_images/Hisense/204/Product_600x600_58.png" />
                 <Product
                productShortDescription="TV Hisense 43 Smart Digital Satellite Television "
                unitListPrice={90}
                brandsName=" Hisense"
                brandProductId={10}
                productIndexName={1}
                unitQuantity={6}
                unitOfMeasure="kg"
                packagingQuantity={12}
                minOrderQuantity={1}
                outerPackQty={12}
                packagingQty={12}
                defaultDiscountPrice={80}
                isDiscontinued={false}
             image="https://hisense2-myapptino-assets.s3.eu-west-2.amazonaws.com/app_assets/product_images/Hisense/212/Images_515x512_80.jpg"/>
            <Product
               productShortDescription="TV Hisense 43 Smart Digital Satellite Television "
               unitListPrice={90}
               brandsName=" Hisense"
               brandProductId={11}
               productIndexName={1}
               unitQuantity={6}
               unitOfMeasure="kg"
               packagingQuantity={12}
               minOrderQuantity={0}
               outerPackQty={12}
               packagingQty={12}
               defaultDiscountPrice={80}
               isDiscontinued={false}
                    image="https://hisense2-myapptino-assets.s3.eu-west-2.amazonaws.com/app_assets/product_images/Hisense/195/Images_515x512_43smart.png" />
                 <Product
               productShortDescription="TV Hisense 43 Smart Digital Satellite Television "
               unitListPrice={90}
               brandsName=" Hisense"
               brandProductId={12}
                    image="https://hisense2-myapptino-assets.s3.eu-west-2.amazonaws.com/app_assets/product_images/Hisense/208/Images_515x512_smart.png" />
                 <Product
                productShortDescription="TV Hisense 43 Smart Digital Satellite Television "
                unitListPrice={90}
                brandsName=" Hisense"
                brandProductId={13}
                productIndexName={0}
                unitQuantity={6}
                unitOfMeasure="kg"
                packagingQuantity={12}
                minOrderQuantity={0}
                outerPackQty={12}
                packagingQty={12}
                defaultDiscountPrice={80}
                isDiscontinued={false}
             image="https://hisense2-myapptino-assets.s3.eu-west-2.amazonaws.com/app_assets/product_images/Hisense/211/Images_515x512_curve.png"/>
           </div>

           <div className="home__row">
            <Product
               productShortDescription="TV Hisense 43 Smart Digital Satellite Television "
               unitListPrice={90}
               brandsName=" Hisense"
               brandProductId={14}
               productIndexName={3}
               unitQuantity={6}
               unitOfMeasure="kg"
               packagingQuantity={12}
               outerPackQty={12}
               packagingQty={12}
               defaultDiscountPrice={80}
               isDiscontinued={false}
                    image="https://hisense2-myapptino-assets.s3.eu-west-2.amazonaws.com/app_assets/product_images/Hisense/204/Product_600x600_58.png" />
                 <Product
               productShortDescription="TV Hisense 43 Smart Digital Satellite Television "
               unitListPrice={90}
               brandsName=" Hisense"
               brandProductId={15}
               productIndexName={4}
               unitQuantity={1}
               unitOfMeasure="kg"
               packagingQuantity={12}
              
               outerPackQty={12}
               packagingQty={12}
               defaultDiscountPrice={80}
               isDiscontinued={false}
                    image="https://hisense2-myapptino-assets.s3.eu-west-2.amazonaws.com/app_assets/product_images/Hisense/204/Product_600x600_58.png" />
                 <Product
               productShortDescription="TV Hisense 43 Smart Digital Satellite Television "
               unitListPrice={90}
               brandsName=" Hisense"
               brandProductId={16}
               productIndexName={10}
               unitQuantity={6}
               unitOfMeasure="kg"
               packagingQuantity={12}
               outerPackQty={12}
               packagingQty={12}
               defaultDiscountPrice={80}
               isDiscontinued={false}
             image="https://hisense2-myapptino-assets.s3.eu-west-2.amazonaws.com/app_assets/product_images/Hisense/212/Images_515x512_80.jpg"/>
            <Product
               productShortDescription="TV Hisense 43 Smart Digital Satellite Television "
               unitListPrice={90}
               brandsName=" Hisense"
               brandProductId={17}
               productIndexName={1}
               unitQuantity={6}
               unitOfMeasure="kg"
               packagingQuantity={12}
               minOrderQuantity={1}
               outerPackQty={12}
               packagingQty={12}
               defaultDiscountPrice={80}
               isDiscontinued={false}
                    image="https://hisense2-myapptino-assets.s3.eu-west-2.amazonaws.com/app_assets/product_images/Hisense/195/Images_515x512_43smart.png" />
                 <Product
                title="TV Hisense 70 Smart 4K T2 Television"
                productShortDescription="TV Hisense 43 Smart Digital Satellite Television "
                unitListPrice={90}
                brandsName=" Hisense"
                brandProductId={18}
                productIndexName={1}
                unitQuantity={6}
                unitOfMeasure="kg"
                packagingQuantity={12}
                minOrderQuantity={1}
                outerPackQty={12}
                packagingQty={12}
                defaultDiscountPrice={8}
                isDiscontinued={false}
                    image="https://hisense2-myapptino-assets.s3.eu-west-2.amazonaws.com/app_assets/product_images/Hisense/208/Images_515x512_smart.png" />
                 <Product
               productShortDescription="TV Hisense 43 Smart Digital Satellite Television "
               unitListPrice={90}
               brandsName=" Hisense"
               brandProductId={20}
               productIndexName={1}
               unitQuantity={6}
               unitOfMeasure="kg"
               packagingQuantity={12}
               minOrderQuantity={1}
               outerPackQty={12}
               packagingQty={12}
               defaultDiscountPrice={20}
               isDiscontinued={false}
             image="https://hisense2-myapptino-assets.s3.eu-west-2.amazonaws.com/app_assets/product_images/Hisense/211/Images_515x512_curve.png"/>
           </div>

        </div>
    );
}
 

 
export default Home;