import React, { Fragment } from "react";
import UseHomepageservices from "../../../Services/UseHomepageservices";
import map from "lodash/map";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import SliderContentWrapper from "../SliderContentWrapper/SliderContentWrapper";
import { Grid, makeStyles, Paper } from "@material-ui/core";
import ProductGridCard from "../../ProductGridCard/ProductGridCard";
import Skeleton from "@material-ui/lab/Skeleton";
import { isMobileOnly } from "react-device-detect";
import data from "../../../ProductData"
const ProductSection = () => {
  
  
  const classes = useStyles();

  const PropertyData = {
    title:"",
    subtitle:""
}
  const FormatedProductDatas  = data
   
  return (
    <Box py={FormatedProductDatas ? 1 : 0}>
      <SliderContentWrapper
        title={
          <Box>
            {FormatedProductDatas?.length > 0 ? (
              <Fragment>
                {PropertyData && PropertyData.title ? (
                  <Typography variant="h2" component="h2">
                    {PropertyData.title}
                  </Typography>
                ) : (
                  ""
                )}
                {PropertyData && PropertyData.subtitle ? (
                  <Typography variant="body1" component="h2">
                    {PropertyData.subtitle}
                  </Typography>
                ) : (
                  ""
                )}
              </Fragment>
            ) : (
              ""
            )}
          </Box>
        }
        showButton={false}
      >
        {!data ? (
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="center"
            className={classes.sectionLoader}
          >
            {Array(6)
              .fill(0)
              .map((data, i) => (
                <Grid
                  key={i}
                  item
                  sm={2}
                  md={2}
                  lg={2}
                  xl={2}
                  className={classes.loaderItem}
                >
                  <Paper square elevation={0}>
                    <Box mb={0.5} height="190px">
                      <Skeleton variant="rect" height="100%" />
                    </Box>
                    <Box m={1}>
                      <Skeleton variant="text" width="90%" />
                      <Skeleton variant="text" />
                      <Skeleton variant="text" />
                      <Skeleton variant="text" />
                    </Box>
                    <Box p={1}>
                      <Skeleton variant="rect" height="25px" />
                    </Box>
                  </Paper>
                </Grid>
              ))}
          </Grid>
        ) : (
          <Fragment>
            <Grid
              container
              direction="row"
              justify="flex-start"
              alignItems="stretch"
              className={classes.productsSectionGrid}
            >
                {data.map((item, i) => (
                <Grid
                  item
                  key={i}
                  xs={6}
                  sm={3}
                  md={3}
                  lg={2}
                  xl={2}
                  className={classes.productsSectionCardList}
                >
                  <ProductGridCard 
                  isDiscontinued={item.isDiscontinued}
                  isNew={item.isNew}
                  internal={item.internal}
                  productAssetss={item.productAssetss}
                  productShortDescription={item.productShortDescription}
                  brandProductId={item.brandProductId}
                  brandsName={item.brandsName}
                  unitListPrice={item.unitListPrice}
                  productIndexName={item.productIndexName}
                  unitQuantity={item.unitQuantity}
                  unitOfMeasure={item.unitOfMeasure}
                  packagingQuantity={item.packagingQuantity}
                  minOrderQuantity={item.minOrderQuantity}
                  outerPackQty={item.outerPackQty}
                  packagingQty={item.packagingQty}
                  productImage={item.productImage}
                  defaultDiscountPrice={item.defaultDiscountPrice}
                  
                  
                  />
                </Grid>
                ))}
            </Grid>
          </Fragment>
        )}
      </SliderContentWrapper>
    </Box>
  );
};

export default ProductSection;
const useStyles = makeStyles((theme) => ({
  productsSectionCardList: {
    padding: !isMobileOnly && theme.spacing(1),
    [theme.breakpoints.between("1024", "1280")]: {
      maxWidth: "20%",
      flexBasis: "20%",
    },
    [theme.breakpoints.between("md", "1024")]: {
      maxWidth: "20%",
      flexBasis: "20%",
    },
  },
  productsSectionGrid: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
}));
