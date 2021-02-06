import React, { Fragment, memo } from "react";
import UseHomepageservices from "../../Services/UseHomepageservices";
import ProductGridCardStyles from "./ProductGridcard.css";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Label from "../../Label";
import Typography from "@material-ui/core/Typography";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Utils from "../../Utils";
import graphqpQueris from "../../graphqlQueries";
import { Link } from "react-router-dom";
import AddtoCart from "../AddToCaet/AddtoCart";
import VisibilityOutlined from "@material-ui/icons/VisibilityOutlined";
import Pricingformat from "../Pricingformat";
import { getProductDiscount } from "../Checkout/checkoutUtils/cart.utils";
import './ProductGridcard.css'
const ProductGridCard = ({
  isDiscontinued,
  isNew,
  internal,
  productAssetss,
  productShortDescription,
  brandProductId,
  brandsName,
  unitListPrice,
  productIndexName,
  unitQuantity,
  unitOfMeasure,
  packagingQuantity,
  minOrderQuantity,
  outerPackQty,
  packagingQty,
  defaultDiscountPrice,
  productImage
  
 }) => {
  
  const { data: cardStyle, alldata } = UseHomepageservices("PRODUCTCARD");
  const classes = ProductGridCardStyles();
  const { placeholderImage } = graphqpQueris.FormatResults(
    alldata || {},
    "HEADER"
  );
  const itemDiscount = getProductDiscount(defaultDiscountPrice, unitListPrice)
  const CardStyleFirst = (
    <Fragment>
      <Typography
        variant="body1"
        component="h3"
        title={productShortDescription}
        gutterBottom
        className={classes.productTitle}
        style={{
          color:"#000"
        }}
      >
        {productShortDescription}
      </Typography>
      <Box display="flex" alignItems="center">
        {/* <Typography
          title={brandProductId}
          variant="caption"
          component="h3"
          gutterBottom
          noWrap
          style={{ flex: "none" }}
        >
          {brandProductId}
        </Typography>
        <Typography
          gutterBottom
          variant="caption"
          noWrap
          style={{ marginLeft: 5, marginRight: 5 }}
        >
          ·
        </Typography> */}
        <Typography
          title={brandsName}
          variant="caption"
          component="h3"
          noWrap
          gutterBottom
          style={{ marginBottom: "16px" }}
        >
          By {brandsName}
        </Typography>
      </Box>
    </Fragment>
  );
  const CardStyleSecond = (
    <Fragment>
      <Typography title={brandsName} variant="caption" component="h3" noWrap>
        {brandsName}
      </Typography>
      <Typography
        variant="body1"
        component="h3"
        title={productShortDescription}
        gutterBottom
        className={classes.productTitle}
      >
        {productShortDescription}
      </Typography>
    </Fragment>
  );
  const CardStyleThird = (
    <Fragment>
      {/* <Typography
        variant="h3"
        component="h3"
        title={brandProductId}
        gutterBottom
        className={classes.productTitle}
      >
        {brandProductId}
      </Typography> */}
      <Typography
        title={brandsName}
        variant="body2"
        component="h3"
        noWrap
        gutterBottom
        color={"textSecondary"}
      >
        By {brandsName}
      </Typography>
      <Typography
        title={productShortDescription}
        variant="body2"
        component="h3"
        gutterBottom
        color={"textSecondary"}
        className={classes.cardThreeProductTitle}
      >
        {productShortDescription}
      </Typography>
    </Fragment>
  );

  return (
    <Fragment>
      <Grid container component={Paper} className={classes.productSectionCard}>
        <Grid item className={classes.proImgContainer}>
          <Box
            component={Link}
           
            to={`/pd/name/${productIndexName}`}
            display="block"
            p={1}
          >
            {(Boolean(isDiscontinued) || Boolean(isNew)) && (
              <Box position="relative">
                {Boolean(isDiscontinued) && (
                  <Box
                    position="absolute"
                    top=" 6px"
                    left="3px"
                    color="red"
                    height="18"
                    zIndex="1"
                  >
                    <Label color="#fd0000">Discontinued</Label>
                  </Box>
                )}
                {Boolean(isNew) && (
                  <Box
                    position="absolute"
                    top=" 6px"
                    right="3px"
                    color="red"
                    height="18"
                    zIndex="1"
                  >
                    <Label color="#388E3C"> New</Label>
                  </Box>
                )}
              </Box>
            )}
            <Box height="250px" position="relative">
              <LazyLoadImage
                width="100%"
                height="100%"
                style={{
                  objectFit: "contain",
                }}
                effect="blur"
                alt="product"
                src={productImage}
              />
              {Boolean(internal) && (
                <Box position="absolute" bottom={0} zIndex={1}>
                  <Label color="primary">Internal</Label>
                </Box>
              )}
            </Box>
          </Box>
          <Box
            p={1}
            component={Link}
            display="block"
            style={{
              textDecoration:"none"
            }}
            to={`/pd/name/${productIndexName}`}
          >
            { CardStyleFirst}
           
            <Grid container className={classes.priceSection}>
              <Box
                display="flex"
                flexWrap="wrap"
                alignItems="center"
                justifyContent="flex-start"
                width="100%"
                
                css={{
                  "& > *": {
                    color:"#000",
                    marginRight: 6,
                  },
                }}
              >
                {defaultDiscountPrice &&
                defaultDiscountPrice !== unitListPrice ? (
                  <Fragment>
                    <Typography
                      variant="h3"
                      style={{
                        fontWeight: 500,
                      }}
                    >
                      <Pricingformat value={defaultDiscountPrice} />
                    </Typography>
                    {itemDiscount>0&&<Fragment><Typography
                      variant="caption"
                      style={{
                        textDecoration: "line-through",
                        paddingLeft: 5,
                        paddingRight: 5,
                      }}
                    >
                      <Pricingformat value={unitListPrice} />
                    </Typography>
                    <Typography color="primary" variant="h3">
                      {itemDiscount}%
                    </Typography></Fragment>}
                  </Fragment>
                ) : (
                  <Typography
                    variant="h3"
                    style={{
                      fontWeight: 500,
                    }}
                  >
                    <Pricingformat  value={unitListPrice} />
                  </Typography>
                )}
              </Box>
              <Fragment>
                <Box
                  alignItems="center"
                  maxWidth={"100%"}
                  overflow="hidden"
                  whiteSpace="nowrap"
                  textOverflow="ellipsis"
                >
                  {cardStyle?.cardStyle === "cardstyle2" && (
                    <Fragment>
                      <Typography variant="caption" noWrap gutterBottom>
                        {unitQuantity} {unitOfMeasure}
                      </Typography>
                      <Typography
                        gutterBottom
                        variant="caption"
                        noWrap
                        style={{ marginLeft: 5, marginRight: 5 }}
                      >
                        ·
                      </Typography>
                      <Typography
                        gutterBottom
                        variant="caption"
                        title={`Pack of ${packagingQuantity}`}
                        noWrap
                      >
                        Pack of {packagingQuantity}
                      </Typography>
                      {Boolean(minOrderQuantity) && (
                        <Fragment>
                          <Fragment>
                            <Typography
                              gutterBottom
                              variant="caption"
                              noWrap
                              style={{ marginLeft: 5, marginRight: 5 }}
                            >
                              ·
                            </Typography>
                            <Typography
                              gutterBottom
                              variant="caption"
                              title={`MOQ ${minOrderQuantity}`}
                              noWrap
                            >
                              MOQ {minOrderQuantity}
                            </Typography>
                          </Fragment>

                          <Fragment>
                            <Typography
                              gutterBottom
                              variant="caption"
                              noWrap
                              style={{ marginLeft: 5, marginRight: 5 }}
                            >
                              ·
                            </Typography>
                            <Typography variant="caption" gutterBottom>
                              Outer Pack Qty {outerPackQty}
                            </Typography>
                          </Fragment>
                        </Fragment>
                      )}
                    </Fragment>
                  )}
                </Box>

                {/* <Box width="100% !important">
                  <Typography
                    // gutterBottom
                    variant="subtitle2"
                    display="block"
                    style={{
                      color: "#388e3c",
                      fontWeight: 600,
                    }}
                  >
                    In Stock
                  </Typography>

                  <Typography
                    // gutterBottom
                    variant="subtitle2"
                    display="block"
                    style={{ color: "red", fontWeight: 600 }}
                  >
                    Out Of Stock
                  </Typography>
                </Box> */}

                {cardStyle?.cardStyle === "cardstyle2" && (
                  <Box display="block" p={1} mb={0.625}>
                    <Grid
                      container
                      direction="row"
                      spacing={1}
                      className={classes.variantsView}
                    >
                      <Grid
                        item
                        xs={6}
                        container
                        direction="row"
                        alignItems="center"
                        className={classes.variantsInner}
                      >
                        <Typography
                          variant="body2"
                          component="span"
                          title={brandProductId}
                          noWrap
                          className="codeValue"
                        >
                          {brandProductId}
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        xs={6}
                        container
                        direction="row"
                        alignItems="center"
                        className={classes.variantsInner}
                      >
                        <Typography noWrap>
                          <Typography
                            variant="caption"
                            style={{ paddingRight: "5px" }}
                          >
                            Inner
                          </Typography>
                          <Typography
                            variant="body2"
                            component="span"
                            title={packagingQty}
                            noWrap
                          >
                            {packagingQty}
                          </Typography>
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        xs={6}
                        container
                        direction="row"
                        alignItems="center"
                        className={classes.variantsInner}
                      >
                        <Typography noWrap style={{ display: "flex" }}>
                          <Typography
                            variant="caption"
                            style={{
                              display: "flex",
                              alignItems: "center",
                              paddingRight: "5px",
                            }}
                          >
                            {/* <FiPackage fontSize="18px" /> */}
                          </Typography>
                          <Typography
                            variant="body2"
                            component="span"
                            title={unitQuantity + " " + unitOfMeasure}
                            noWrap
                          >
                            {unitQuantity} {unitOfMeasure}
                          </Typography>
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        xs={6}
                        container
                        direction="row"
                        alignItems="center"
                        className={classes.variantsInner}
                      >
                        <Typography noWrap>
                          <Typography
                            variant="caption"
                            style={{ paddingRight: "5px" }}
                          >
                            Outer
                          </Typography>
                          <Typography
                            variant="body2"
                            component="span"
                            title={outerPackQty}
                            noWrap
                          >
                            {outerPackQty}
                          </Typography>
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        xs={6}
                        container
                        direction="row"
                        alignItems="center"
                        className={classes.variantsInner}
                      >
                        <Typography
                          variant="caption"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            paddingRight: "5px",
                          }}
                        >
                          <VisibilityOutlined />
                        </Typography>
                        <Typography variant="body2">View</Typography>
                      </Grid>
                      <Grid
                        item
                        xs={6}
                        container
                        direction="row"
                        alignItems="center"
                        className={classes.variantsInner}
                      >
                        <Typography noWrap>
                          <Typography
                            variant="caption"
                            style={{ paddingRight: "5px" }}
                          >
                            MOQ
                          </Typography>
                          <Typography
                            variant="body2"
                            component="span"
                            title={minOrderQuantity}
                            noWrap
                          >
                            {minOrderQuantity}
                          </Typography>
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                )}
              </Fragment>
            </Grid>
          </Box>
        </Grid>
        <Grid className={classes.productGridAddtocart}>
          <AddtoCart
            className={classes.addtocartbutton}
            brandProductId={brandProductId}
            cartPrice={
              defaultDiscountPrice ? defaultDiscountPrice : unitListPrice
            }
          />
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default memo(ProductGridCard);
