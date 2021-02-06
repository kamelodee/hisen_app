import React, { Fragment, useState } from "react";
import Box from "@material-ui/core/Box";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Container from "@material-ui/core/Container";
import Skeleton from "@material-ui/lab/Skeleton";
import { NavLink, useHistory, useParams } from "react-router-dom";

import ProductDetailPageStyles from "./ProductDetailPage.css";
import find from "lodash/find";
import isArray from "lodash/isArray";
import Pricingformat from "../Pricingformat";
import SingleProductSlider from "./components/SingleProductSlider";
import orderBy from "lodash/orderBy";
import ProductsSlider from "./components/ProductsSlider";
import map from "lodash/map";
import AddtoCart from "../AddToCaet/AddtoCart";
import Footer from "../Footer/Footer";
import { getProductDiscount } from "../Checkout/checkoutUtils/cart.utils";
import truncate from "lodash/truncate";
import uniq from "lodash/uniq";
import Label from "../../Label";
const ProductDetailPage = () => {
  const classes = ProductDetailPageStyles();
  const [Tabvalue, setTabvalue] = useState(0);
  const { productid } = useParams();
  const { push } = useHistory();
  const { data, isLoading } ={}
  const handleTabChange = (event, newValue) => {
    setTabvalue(newValue);
  };
  const {
    productShortDescription,
    brandsName,
    pgName,
    productDescription,
    productSpecifications,
    unitListPrice,
    productId: id,
    brandProductId,
    productGroupId,
    productAttributes,
    productAssetss,
    productsSubCategories,
    defaultDiscountPrice,
    isDiscontinued,
    isNew,
  } = data ? (data.productdata ? data.productdata : {}) : {};
  const itemDiscount = getProductDiscount(defaultDiscountPrice, unitListPrice);
  const {
    productGroupSpecifications,
    description,
    productGroupAssetss,
    productGroupAccessorieses,
  } = data ? (data.productgroupdata ? data.productgroupdata : {}) : {};
  let Breadcrumb = {};
  const Primarysub = data && find(productsSubCategories, (o) => o.isPrimary);
  if (Primarysub) {
    Breadcrumb = Primarysub;
  } else if (data) {
    Breadcrumb = productsSubCategories.length ? productsSubCategories[0] : {};
  }

  return (
    <Box css={{ background: "#fff", paddingTop: "30px" }}>
      <Container maxWidth="lg">
        <Box pb={2} pt={1}>
          {isLoading ? (
            <Box mb={2}>
              <Box m={1}>
                <Skeleton variant="text" width="40%" />
              </Box>
              <Grid container className={classes.pdpProductDetail}>
                <Grid item md={8}>
                  <Skeleton variant="text" width="80%" />
                  <Skeleton variant="text" width="40%" />
                  <Box display="flex">
                    <Box
                      mt={2}
                      width="50%"
                      ml={2}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Skeleton variant="rect" width={210} height={118} />
                    </Box>
                    <Box width="50%" ml={2}>
                      <Box m={1}>
                        {new Array(5).fill(0).map((data, i) => (
                          <Skeleton key={i} variant="text" width="80%" />
                        ))}
                      </Box>
                    </Box>
                  </Box>
                </Grid>
                <Grid item md={4}>
                  <Box m={1}>
                    {new Array(5).fill(0).map((data, i) => (
                      <Skeleton key={i} variant="text" width="80%" />
                    ))}
                  </Box>
                </Grid>
              </Grid>
            </Box>
          ) : (
            <Fragment>
              <Breadcrumbs className={classes.breadcrumbSection}>
                <NavLink
                  style={{
                    textDecoration: "none",
                  }}
                  to="/"
                >
                  Home
                </NavLink>
                {Breadcrumb.majorCategoryName && (
                  <NavLink
                    style={{
                      textDecoration: "none",
                    }}
                    to={`/p/m/${Breadcrumb.majorCategoryName.replace(
                      /\//g,
                      "~"
                    )}/1`}
                  >
                    {Breadcrumb.majorCategoryName}
                  </NavLink>
                )}
                {Breadcrumb.categoryName && (
                  <NavLink
                    style={{
                      textDecoration: "none",
                    }}
                    to={`/p/c/${Breadcrumb.categoryName.replace(/\//g, "~")}/1`}
                  >
                    {Breadcrumb.categoryName}
                  </NavLink>
                )}
                {Breadcrumb.subCategoryName && (
                  <NavLink
                    style={{
                      textDecoration: "none",
                    }}
                    to={`/p/s/${Breadcrumb.subCategoryName.replace(
                      /\//g,
                      "~"
                    )}/1`}
                  >
                    {Breadcrumb.subCategoryName}
                  </NavLink>
                )}
                {/* <Typography color="textPrimary" variant="subtitle2" style={{
                lineHeight:"36px",
                fontWeight: 500,
                fontSize: '26px'}}
              >
                {productShortDescription}
              </Typography> */}
              </Breadcrumbs>
              <Box display="flex" p={2}>
                <Box
                  // component={Paper}
                  p={1}
                  variant="outlined"
                  width="60%"
                >
                  <SingleProductSlider
                    Assets={uniq(
                      [
                        ...orderBy(productAssetss, "isDefault", "desc"),
                        ...orderBy(productGroupAssetss, "isDefault", "desc"),
                      ],
                      "source"
                    )}
                  />
                </Box>
                <Box width="40%" ml={2}>
                  <Typography
                    variant="h1"
                    component="h1"
                    gutterBottom
                    style={{
                      lineHeight: "36px",
                      fontWeight: 500,
                      fontSize: "26px",
                    }}
                  >
                    {productShortDescription}
                  </Typography>
                  <Box display="flex" mb={1}>
                    <Typography gutterBottom variant="subtitle1">
                      {brandsName}
                    </Typography>
                    <Box px={0.625}>·</Box>
                    <Typography gutterBottom variant="subtitle1">
                      {brandProductId}
                    </Typography>
                  </Box>
                  <Box my={1}>
                    <Divider />
                  </Box>

                  {(Boolean(isDiscontinued) || Boolean(isNew)) && (
                    <Box display="flex" justifyContent="space-between">
                      {Boolean(isDiscontinued) && (
                        <Box color="red" height="18">
                          <Label color="#fd0000">Discontinued</Label>
                        </Box>
                      )}
                      {Boolean(isNew) && <Label color="#388E3C"> New</Label>}
                    </Box>
                  )}

                  <Box
                    display="flex"
                    alignItems="baseline"
                    my={3}
                    css={{
                      "& > *": {
                        marginRight: 6,
                      },
                    }}
                  >
                    {defaultDiscountPrice &&
                    defaultDiscountPrice !== unitListPrice ? (
                      <Fragment>
                        <Typography
                          variant="h2"
                          style={{
                            fontWeight: 500,
                          }}
                        >
                          <Pricingformat value={defaultDiscountPrice} />
                        </Typography>
                        {itemDiscount > 0 && (
                          <Fragment>
                            <Typography
                              variant="caption"
                              style={{
                                textDecoration: "line-through",
                                paddingLeft: 5,
                                paddingRight: 5,
                              }}
                            >
                              <Pricingformat value={unitListPrice} />
                            </Typography>
                            <Typography
                              color="primary"
                              style={{
                                fontWeight: 500,
                              }}
                              variant="h2"
                            >
                              {itemDiscount}%
                            </Typography>
                          </Fragment>
                        )}
                      </Fragment>
                    ) : (
                      <Typography
                        variant="h2"
                        style={{
                          fontWeight: 500,
                        }}
                      >
                        <Pricingformat value={unitListPrice} />
                      </Typography>
                    )}
                  </Box>
                  {/* {!Boolean(isNew) && (
                  <Box color="#388E3C">
                    <Typography variant='h5'>InStock</Typography>
                  </Box>
                )} */}
                  <Grid container className={classes.variantList}>
                    {productAttributes &&
                      Object.keys(productAttributes).map((data, i) => (
                        <Fragment key={i}>
                          <Grid
                            item
                            md={6}
                            key={i}
                            className={classes.variantListItem}
                          >
                            <Typography variant="subtitle2">{data}</Typography>
                            <Typography
                              variant="body1"
                              component="div"
                              className={classes.productAttributesList}
                            >
                              {isArray(productAttributes[data]) ? (
                                productAttributes[data].map((o, i) => (
                                  <Box key={o}>
                                    {o}
                                    {i !== productAttributes[data].length - 1
                                      ? ", "
                                      : ""}
                                    &nbsp;
                                  </Box>
                                ))
                              ) : (
                                <Box>{productAttributes[data]}</Box>
                              )}
                            </Typography>
                          </Grid>
                        </Fragment>
                      ))}
                  </Grid>
                  <Box
                    my={2}
                    mb={3}
                    justifyContent="space-between"
                    display="flex"
                  >
                    <Box width="100%">
                      <AddtoCart
                        brandProductId={brandProductId}
                        size="large"
                        variant="outlined"
                        color="secondary"
                        fullWidth
                        cartPrice={
                          defaultDiscountPrice
                            ? defaultDiscountPrice
                            : unitListPrice
                        }
                      />
                    </Box>
                    <Box pl={1} width="100%">
                      <Button
                        size="large"
                        variant="contained"
                        color="secondary"
                        fullWidth
                        onClick={() => {
                          localStorage.setItem(
                            "direct_checkout",
                            JSON.stringify([
                              {
                                productId: brandProductId,
                                productsId: brandProductId,
                                cartPrice: unitListPrice,
                                quantity: 1,
                              },
                            ])
                          );
                          push("/checkout/summary/direct_checkout");
                        }}
                      >
                        Buy now
                      </Button>
                    </Box>
                  </Box>
                  <Divider />
                  <Box m={3} />
                  <Grid container spacing={2}>
                    <Grid item md={6}>
                      <Typography variant="h5">Product Name</Typography>
                    </Grid>
                    <Grid item md={6}>
                      <Typography>{pgName}</Typography>
                    </Grid>
                  </Grid>
                  <Box m={3} />
                  <Typography variant="h4">Highlights</Typography>
                  {description && (
                    <Grid item md={6}>
                      <Box
                        mb={2}
                        dangerouslySetInnerHTML={{
                          __html: truncate(description, {
                            length: 300,
                            separator: " ",
                            omission: " ",
                          }),
                        }}
                      />
                    </Grid>
                  )}
                </Box>
              </Box>
            </Fragment>
          )}
        </Box>
        <Fragment>
          {productid && productGroupId && (
            <ProductsSlider
              title={"Similar Products"}
              GroupIds={[productGroupId]}
              currentProductId={id}
            />
          )}
          {productGroupAccessorieses && (
            <ProductsSlider
              title={"Related Products"}
              GroupIds={map(
                productGroupAccessorieses,
                "accessoryProductGroupId"
              )}
              currentProductId={id}
            />
          )}
          {!isLoading && (
            <Fragment>
              <Box mt={2} centered={"false"}>
                <Tabs
                  value={Tabvalue}
                  indicatorColor="primary"
                  textColor="primary"
                  onChange={handleTabChange}
                  centered
                  aria-label="disabled tabs example"
                >
                  <Tab label="Description" {...a11yProps(0)} />
                  <Tab label="Specifications" {...a11yProps(1)} />
                </Tabs>
              </Box>
              <TabPanel value={Tabvalue} index={0}>
                {productDescription && (
                  <Box
                    mb={2}
                    dangerouslySetInnerHTML={{
                      __html: productDescription,
                    }}
                  />
                )}
                {description && (
                  <Fragment>
                    <Typography gutterBottom variant="h3">
                      Highlights
                    </Typography>
                    <Box
                      height="100%"
                      dangerouslySetInnerHTML={{
                        __html: description,
                      }}
                    />
                  </Fragment>
                )}
              </TabPanel>
              <TabPanel value={Tabvalue} index={1}>
                {Boolean(productSpecifications?.length) && (
                  <Box width="50%">
                    <Grid
                      container
                      spacing={1}
                      component={Paper}
                      elevation={0}
                      className={classes.pdpDescriptionSection}
                    >
                      {productSpecifications.map((data, i) => (
                        <Grid item md={6} key={i}>
                          <Typography gutterBottom variant="subtitle2">
                            {data.key}
                          </Typography>
                          <Typography>{data.value}</Typography>
                          <Divider />
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                )}
                {Boolean(productGroupSpecifications?.length) && (
                  <Box width="50%">
                    <Typography gutterBottom variant="h3">
                      General Specifications{" "}
                    </Typography>
                    <Grid
                      container
                      spacing={1}
                      component={Paper}
                      elevation={0}
                      className={classes.pdpDescriptionSection}
                    >
                      {productGroupSpecifications.map((data, i) => (
                        <Grid item md={6} key={i}>
                          <Typography gutterBottom variant="subtitle2">
                            {data.key}
                          </Typography>
                          <Typography>{data.value}</Typography>
                          <Divider />
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                )}
              </TabPanel>
            </Fragment>
          )}
        </Fragment>
      </Container>
      <Footer />
    </Box>
  );
};

export default ProductDetailPage;
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
