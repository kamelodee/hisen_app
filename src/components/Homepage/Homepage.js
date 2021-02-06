import React, { Fragment, lazy, memo, Suspense, useMemo } from "react";

import Skeleton from "@material-ui/lab/Skeleton";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import ProductSection from "./CollectionSlider/ProductSection";
import { LazyLoadImage } from "react-lazy-load-image-component";
import CustomImageLink from "./CustomImageLink";
import Footer from "../Footer/Footer";
import { isMobileOnly } from "react-device-detect";
import Category from "../../components/Category/Category"
const BannerSlider = lazy(() =>
  import("./Slider/BannerSliderComponents")
);
const CollectionSlider = lazy(() =>
  import("./CollectionSlider/ProductSection")
);
const Homepage = () => {
  const UseHomepageservices ={}
  const { data, isLoading } = UseHomepageservices;
  const HomePageList = data;
  
  return (
    <Fragment>
      {useMemo(() => {
        return (
        
        
            <Fragment >
             
                <Suspense
                 
                >

            <LazyLoadImage
                width="100%"
                height="90%"
                style={{
                  objectFit: "cover",
                }}
                effect="blur"
                alt="product"
                src="https://hisense2-myapptino-assets.s3.eu-west-2.amazonaws.com/app_assets/company_images/1/homepage/Sliders_1200x400b_1603253846203.jpg"
              />
                 
                </Suspense>
            
                <div className="home__row top__category"
                style={{
                  display:'flex'
                }}
                
                >
           
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
             
                  <Box pb={2}>
                    <Suspense
                      fallback={Array(6)
                        .fill(0)
                        .map((data, i) => (
                          <Grid key={i} item sm={2} md={2} lg={2} xl={2}>
                            <Paper square elevation={0}>
                              <Box height="190px">
                                <Skeleton variant="rect" height="100%" />
                              </Box>
                              <Box p={1}>
                                <Skeleton
                                  variant="text"
                                  width="90%"
                                  height="20px"
                                />
                              </Box>
                            </Paper>
                          </Grid>
                        ))}
                    >
                     
                    </Suspense>
                  </Box>
                



                  <CollectionSlider/>
             
                 
                
             
                  <LazyLoadImage
                width="100%"
                height="90%"
                style={{
                  objectFit: "cover",
                }}
                effect="blur"
                alt="product"
                src="https://hisense2-myapptino-assets.s3.eu-west-2.amazonaws.com/app_assets/company_images/1/homepage/Sliders_1200x400_1603254187914.jpg"
              />
                 <ProductSection  /> 
                 <ProductSection  />
            </Fragment>
          )
        
      }, [HomePageList, isLoading])}
      {!isMobileOnly && <Footer />}
    </Fragment>
  );
};

export default memo(Homepage);
