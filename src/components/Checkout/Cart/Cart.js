import React, { useState, Fragment, useEffect } from "react";
import CartProductCard from "./componentd/CartProductCard/CartProductsCard";
import _ from "lodash";
import Skeleton from "@material-ui/lab/Skeleton";
import useStyles from "./cartPage.css";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import UseCheckoutservices from "../../../Services/CheckoutPageServices";
import Elasticsearch from "../../../Services/ElasticSearch";
import CartPriceDetails from "./componentd/CartPriceDetails/CartPriceDetails";
import { cartCalculation } from "../checkoutUtils/cart.utils";
import UseHomepageservices from "../../../Services/UseHomepageservices";

import { useHistory } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import Utils from "../../../Utils";
import { Label, ShoppingCartTwoTone } from "@material-ui/icons";
import { isMobile } from "react-device-detect";
import Pricingformat from "../../Pricingformat";
import { Tooltip } from "@material-ui/core";
import UseSFLservices from "../../../Services/SFLServices";
import UseAuth from "../../../Services/UseAuth";
import UseFetchUser from "../../../Services/UseFetchuserdetails";
import AxiosConfigure from "../../../Axios.configure";
import Container from "@material-ui/core/Container";
import remove from "lodash/remove";
import MuiAlert from '@material-ui/lab/Alert';

const Cart = () => {
  const { data: cart, mutate } = UseCheckoutservices();
  const { data: SFL, mutate: SFLmutate } = UseSFLservices(
    `carts/getSaveForLaterList?userId=`
  );
  const [cartData, setCartData] = useState([]);
  const [CartValue, setCartValue] = useState([]);
  const [SFLData, setSFLData] = useState([]);
  const [cartLoading, setcartLoading] = useState(true);
  useEffect(() => {
    if (cart.length > 0) {
      async function fetchCartData() {
        const cartData = []
        const cartResult = cartData;
        const total = cartCalculation(cartResult, cart);
        setCartValue(total.cartValue);
        setCartData(total.cartData);
        setcartLoading(false);
      }
      fetchCartData();
    } else {
      setCartData([]);
      setcartLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart.length]);
  const { data: isLoggedIn } = UseAuth();
  const { data: userdetails } = UseFetchUser(isLoggedIn);

  const { alldata,placeholderImage } = {}
  
  useEffect(() => {
    if (SFL.length > 0 && isLoggedIn) {
      async function fetchSFLData() {
        const fetchSFLData = {}
        const fetchSFLDataResult = {};
        const total = cartCalculation(fetchSFLDataResult, SFL);
        setSFLData(total.cartData);
      }
      fetchSFLData();
    } else if (isLoggedIn) {
      setSFLData([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [SFL, isLoggedIn]);
  // const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();

  // const [opendeletedialog, setopendeletedialog] = useState(false);
  // const [openConfirmationDialog, setopenConfirmationDialog] = useState(false);
  // const [selected, setSelected] = useState([]);

  const classes = useStyles();
  const handleClick = (event) => {
    if (_.some(cartData, value => value.ErrorMessage)) {
      setOpen(true)
      return
    }
    if (isLoggedIn) {
      history.push("/checkout/summary/iscart");
    } else {
      localStorage.setItem("direct_checkout", JSON.stringify(cart));
      history.push("/checkout/summary/direct_checkout");
    }
  };

  // const [anchorEl, setAnchorEl] = React.useState(null);

  // const handleMenuClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  // const handleClose = () => {
  //   setAnchorEl(null);
  // };
  // const clearCart = () => {
  //   let clear = {
  //     data: [],
  //   };
  //   CartDispatch({
  //     type: "UPDATE_CART_DATA",
  //     payload: clear,
  //   });
  //   if (!userId) {
  //     Storage.set({
  //       key: "CartInfo",
  //       value: JSON.stringify(clear),
  //     });
  //   }
  //   handleClose();
  // };
  const [open, setOpen] = React.useState(false);
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  return (
    <React.Fragment>
      <Container maxWidth="lg">
        <Box display="flex" flexWrap="wrap" flexDirection={isMobile ? "column" : "row"} my={6}>
          {/* <Box width="100%" display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h2" component="h1">
              Your cart
          </Typography>
            <Link to="/" className={classes.primaryLink}>
              Continue shopping
          </Link>
          </Box> */}
          {!cartLoading && cartData.length > 0 && (
            <Box width={isMobile ? "100%" : "70%"} pr={isMobile ? 0 : 2}>
              <Box display="flex" flexDirection="row" mb={2}>
                <Box flexGrow={1}>
                  <Typography variant="h3">
                  My cart ({cartData.length === 1
                      ? cartData.length + " item"
                      : cartData.length + " items"}
                    {""})
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="h3">
                    {!isMobile && <Box component="span">Subtotal: </Box>}
                    {<Pricingformat value={CartValue.subTotal} />}
                  </Typography>
                </Box>
              </Box>
              {cartLoading
                ? new Array(4).fill(0).map((data, i) => (
                  <Box
                    display={isMobile ? "block" : "flex"}
                    alignItems="center"
                    justifyContent="space-between"
                    component={Paper}
                    p={2}
                    mb={1}
                  >
                    <Box
                      display="flex"
                      alignItems="center"
                      width={isMobile ? "100%" : "50%"}
                    >
                      <Box pr={1} height={"75px"} width={"75px"}>
                        <Skeleton variant="rect" height="100%" />
                      </Box>
                      <Box width={isMobile ? "80%" : "80%"}>
                        <Skeleton variant="text" width="90%" />
                        <Skeleton variant="text" />
                        <Skeleton variant="text" />
                        <Skeleton variant="text" />
                      </Box>
                    </Box>
                  </Box>
                ))
                : cartData.length > 0 && (
                  <CartProductCard
                    // setopendeletedialog={setopendeletedialog}
                    // setSelected={setSelected}
                    userdetails={userdetails}
                    // currency={currency}
                    isLoggedIn={isLoggedIn}
                    data={cart}
                    sfl={SFL}
                    cartData={cartData}
                    setCartData={setCartData}
                    setCartValue={setCartValue}
                    mutate={mutate}
                    SFLmutate={SFLmutate}
                    setcartLoading={setcartLoading}
                    cartLoading={cartLoading}
                  // priceLoading={priceLoading}
                  // setpriceLoading={setpriceLoading}
                  // productAssetsData={productAssetsData}
                  // removeItem={removeItem}
                  ></CartProductCard>
                )}
            </Box>
          )}
          {!cartLoading && cartData.length > 0 && (
            <Box width={isMobile ? "100%" : "30%"}>
              <CartPriceDetails cartValue={CartValue} loading={cartLoading} />
              <Box alignItems="center" mt={2}>
                <Button
                  fullWidth
                  color="primary"
                  variant="contained"
                  onClick={handleClick}
                >
                  Place Order
                </Button>
              </Box>
            </Box>
          )}
          {!cartLoading && cartData.length === 0 && (
            <Box display="flex" flexDirection="column" margin="auto" pb={2}>
              <div
                style={{
                  margin: "auto",
                  // position: 'relative',
                }}
              >
                {/* <img width="100%" height="100%" alt="complex" src="" /> */}
                <ShoppingCartTwoTone
                  color="primary"
                  style={{ fontSize: "20em" }}
                />
              </div>
              <Box margin="auto">
                <Typography variant="h4">Your Cart is Empty</Typography>
              </Box>
              <Box margin="auto">
                <Link to="/" className={classes.primaryLink}>
                  Explore more products
                </Link>
              </Box>
            </Box>
          )}
        </Box>
        {isLoggedIn && (
          <Box mt={2} mb={1.2}>
            <Typography variant="h3">
              Saved For Later (
              {SFLData.length === 1
                ? SFLData.length + " item"
                : SFLData.length + " items"}
              )
            </Typography>
          </Box>
        )}
        {SFLData.length > 0 && (
          <Box component={Paper} my={2} p={2}>
            <Grid container>
              {SFLData.map((sfl, i) => (
                <Grid
                  item
                  key={i}
                  xs={12}
                  sm={4}
                  md={4}
                  lg={3}
                  className={classes.plpGridCard}
                >
                  <Box p={1}>
                    {(Boolean(sfl.isDiscontinued) || Boolean(sfl.isNew)) && (
                      <Box position="relative">
                        {Boolean(sfl.isDiscontinued) && (
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
                        {Boolean(sfl.isNew) && (
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
                    <Box position="relative">
                      {true ? (
                        <Box position="relative">
                          <LazyLoadImage
                            width="100%"
                            height="100%"
                            style={{
                              objectFit: "contain",
                              height: "200px",
                            }}
                            effect="blur"
                            alt="Logo"
                            src={Utils.GetProductImages(
                              sfl.productAssetss,
                              placeholderImage
                            )}
                            onClick={() => {
                              history.push(`/pd/name/${sfl.productIndexName}`);
                            }}
                          />
                          {Boolean(sfl.internal) && (
                            <Box position="absolute" bottom={0} zIndex={1}>
                              <Label color="primary">Internal</Label>
                            </Box>
                          )}
                        </Box>
                      ) : (
                          <Skeleton variant="rect" height="200px" />
                        )}
                    </Box>
                    <Fragment>
                      <Typography
                        variant="h3"
                        component="h3"
                        title={sfl.productShortDescription}
                        gutterBottom
                        style={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          display: "-webkit-box",
                          WebkitBoxOrient: "vertical",
                          WebkitLineClamp: 2,
                          paddingTop: '8px'
                        }}
                      // className={classes.productTitle}
                      >
                        {sfl.productShortDescription}
                      </Typography>
                      <Box display="flex" alignItems="center" py={1}>
                        <Typography
                          title={sfl.brandProductId}
                          variant="caption"
                          // component="h3"
                          gutterBottom
                          noWrap
                          style={{ flex: "none" }}
                        >
                          {sfl.brandProductId}
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
                          title={sfl.brandsName}
                          variant="caption"
                          component="h3"
                          noWrap
                          gutterBottom
                        >
                          By {sfl.brandsName}
                        </Typography>
                      </Box>
                      <Box display="flex" alignItems="center" py={1}>
                        <Typography variant="h5">
                          {<Pricingformat value={sfl.unitPrice} />}
                        </Typography>
                        <Box mr={0.5}></Box>
                        {sfl.discount > 0 && (
                          <Typography
                            variant="caption"
                            component="strike"
                            ml={1}
                          >
                            {<Pricingformat value={sfl.unitListPrice} />}
                          </Typography>
                        )}
                        <Box mr={0.5}></Box>
                        {sfl.discount > 0 && (
                          <Typography variant="h6" color="primary" noWrap>
                            ({sfl.discount}% Off)
                          </Typography>
                        )}
                      </Box>
                      <Box
                        display="flex"
                        marginTop={cart.customProduct ? "20px" : "unset"}
                        alignItems="center"
                        mt={2}
                      >
                        <Box mr={1}>
                          <Tooltip
                            title="Remove from my cart"
                            aria-label="remove"
                          >
                            <Button
                              onClick={async () => {
                                const axios = await AxiosConfigure.PrivateConfigiration();
                                await axios.delete(
                                  `carts/${userdetails.id}`,
                                  { data: [cart.brandProductId] }
                                );
                                remove(
                                  SFL,
                                  (o) => o.productId === sfl.brandProductId
                                );
                                mutate(() => ({ data: [...cart] }), false);
                                SFLmutate(() => ({ data: [...SFL] }), false);
                              }}
                            >
                              Remove
                            </Button>
                          </Tooltip>
                        </Box>
                        {/* {isMobile&&<Box>
                      <IconButton 
                        aria-label="delete"
                        onClick={async () => {
                          const axios = await AxiosConfigure.PrivateConfigiration();
                          await axios.put(`carts/${userdetails.id}?productsId=${sfl.brandProductId}`);
                          mutate(() => ({ data: [...cart] }), false);
                          SFLmutate(() => ({ data: [...SFL] }), false);
                        }}
                      ><DeleteIcon/></IconButton>
                  </Box>} */}
                        <Box>
                          <Tooltip
                            title="Move back to cart"
                            aria-label="remove"
                          >
                            <Button
                              fullWidth
                              color="primary"
                              onClick={async () => {
                                const axios = await AxiosConfigure.PrivateConfigiration();
                                await axios.put(
                                  `carts/movebackToCart/${userdetails.id}`,
                                  {
                                    productId: sfl.brandProductId,
                                    productsId: sfl.brandProductId,
                                  }
                                );
                                mutate(() => ({ data: [...cart] }));
                                SFLmutate(() => ({ data: [...SFL] }));
                              }}
                            >
                              Move To Cart
                            </Button>
                          </Tooltip>
                        </Box>
                      </Box>
                    </Fragment>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Container>
      {/* <Snackbar style={{width:"60%"}} open={open} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
        <Alert style={{width:"60%"}} severity="error" >
          Invalid Qty!
      </Alert>
      </Snackbar> */}
      {open }
    </React.Fragment>
  );
};

export default Cart;
