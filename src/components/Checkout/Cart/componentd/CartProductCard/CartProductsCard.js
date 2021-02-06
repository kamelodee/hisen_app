import React from "react";
import {
  Paper,
  Typography,
  ButtonBase,
  Box,
  Tooltip,
  Button,
  TextField,
  FormHelperText,
} from "@material-ui/core";
import useStyles from "./CartProductCard.css";
import _ from "lodash";
import Skeleton from "@material-ui/lab/Skeleton";
import { useHistory } from "react-router-dom";
import Utils from "../../../../../Utils";
import UseHomepageservices from "../../../../../Services/UseHomepageservices";
import { cartCalculation } from "../../../checkoutUtils/cart.utils";
import { isMobile } from "react-device-detect";
import Pricingformat from "../../../../Pricingformat";
import AxiosConfigure from "../../../../../Axios.configure";


const CartProductCard = ({ userdetails, cartData, setCartValue, setCartData, data, mutate, sfl, SFLmutate, isLoggedIn }) => {
  const classes = useStyles();
  const history = useHistory();

  const GetProductLink = (data) => {
    if (data.productId) {
      return data.productId.toString().padStart(15, "Prod00000000");
    }
  };

  const { alldata,placeholderImage } = {placeholderImage:"",alldat:{}}

  
  function ValidateQuantity(step, min, max, value) {
    let errMessage = false;

    let isStepvalid = ValidateStep(step, min, value);
    if (value) {
      if (parseFloat(value) < parseFloat(min)) {
        errMessage = "Enter minimum value of " + min;
      } else {
        if (isStepvalid) {
          if (parseFloat(value) > parseFloat(max)) {
            errMessage = "Enter maximum value of " + max;
          }
        } else {
          errMessage = "Enter in multiples of " + step;
        }
      }
    } else {
      errMessage = "Required ";
    }

    return errMessage;
  }
  function ValidateStep(step, stepBase, value) {
    let valueDecimals = countDecimals(value);
    let stepBaseDecimals = countDecimals(stepBase);
    let stepDecimals = countDecimals(step);
    let decimalCount = Math.max(valueDecimals, stepBaseDecimals, stepDecimals);
    let multiplier = Math.pow(10, decimalCount);
    value = value * multiplier;
    stepBase = stepBase * multiplier;
    step = step * multiplier;
    return (value - stepBase) % step === 0;
  }
  function countDecimals(value) {
    let numString = value.toString();
    let decimalSymbolIndex = numString.indexOf(".");

    if (decimalSymbolIndex === -1) {
      if (-1 < value && value < 1) {
        // It may be in the exponential notation format (`1e-X`)
        let match = /e-(\d+)$/.exec(numString);

        if (match) {
          return Number(match[1]);
        }
      }

      return 0;
    }

    return numString.length - decimalSymbolIndex - 1;
  }
  const onQtyEdit = (index) => e => {
    const { step, min, max, value } = e.target;
    if (!Boolean(ValidateQuantity(step, min, max, value)) && value) {
      cartData[index].askedQuantity = parseFloat(e.target.value)
      cartData[index].ErrorMessage = ''
      const total = cartCalculation(cartData, data, 2, false, true)
      setCartValue(total.cartValue)
      setCartData(total.cartData)
    } else {
      cartData[index].askedQuantity = e.target.value
      cartData[index].ErrorMessage = ValidateQuantity(step, min, max, value)
      const total = cartCalculation(cartData, data, 2, false, true)
      setCartValue(total.cartValue)
      setCartData(total.cartData)
    }
  }
  const productBoxCard = cartData.map((cart, index) => (
    <React.Fragment key={index}>
      <Paper className={classes.paper}>
        <Box
          display="flex"
          flexDirection={isMobile ? "column" : "row"}
          justify="flex-start"
        >
          <Box
            display="flex"
            flexDirection="row"
            justify="flex-start"
            alignItems="center"
            width={isMobile ? "100%" : "80%"}
            flexGrow={1}
          >
            <Box>
              <ButtonBase
                onClick={
                  cart.productId
                    ? () => {
                      history.push(`/pd/name/${GetProductLink(cart)}`);
                    }
                    : null
                }
                style={{
                  width: isMobile ? 80 : 134,
                  height: isMobile ? 80 : 134,
                  backgroundColor: "#0000000d",
                  padding: 5,
                }}
              >
                {
                  <img
                    className={classes.img}
                    alt="complex"
                    src={Utils.GetProductImages(
                      cart.productAssetss,
                      placeholderImage
                    )}
                  />
                }
              </ButtonBase>
            </Box>
            <Box display="grid" pl={2}>
              {!cart.customProduct && (
                <Typography
                  onClick={() => {
                    history.push(`/pd/name/${GetProductLink(cart)}`);
                  }}
                  className={classes.cartProductTitle}
                  variant="body1"
                  gutterBottom
                  style={{ paddingRight: isMobile ? 0 : "16px" }}
                >
                  {cart.productShortDescription}
                </Typography>
              )}
              <Box
                display="flex"
                flexDirection="row"
                justify="flex-start"
                alignItems="center"
              >
                <Box mb={1}>
                  {/* <Typography gutterBottom variant="caption">
                    {cart.brandProductId}
                  </Typography>
                  <Box component="span" ml={0.5} mr={0.5}>
                    ·
                  </Box> */}
                  <Typography gutterBottom variant="caption">
                    by {cart.brandsName}
                  </Typography>
                </Box>
              </Box>
              <Box display="flex" alignItems="center" mb={1}>
                <Typography variant="h3">
                  {<Pricingformat value={cart.unitPrice} />}
                </Typography>
                <Box mr={0.5}></Box>
                {cart.discount > 0 && (
                  <Typography
                    variant="caption"
                    component="strike"
                    style={{ paddingLeft: 5 }}
                  >
                    {<Pricingformat value={cart.unitListPrice} />}
                  </Typography>
                )}
                <Box mr={0.5}></Box>
                {!isMobile && cart.discount > 0 && (
                  <Typography variant="h6" color="primary">
                    ({cart.discount}% Off)
                  </Typography>
                )}
              </Box>
              <Box display="flex" alignItems="center">
                <Typography>Qty: </Typography>
                <Box mr={1}></Box>
                <Box minWidth={100} maxWidth={100}>
                  <TextField
                    value={cart.quantity}
                    inputProps={{
                      min: 1,
                      max: 50,
                      step: cart.packagingQty ? cart.packagingQty : 1
                    }}
                    onBlur={async () => {
                      if (cart.quantity && data[index].quantity !== cart.quantity) {
                        if (isLoggedIn) {
                          data[index].quantity = cart.quantity
                          const axios = await AxiosConfigure.PrivateConfigiration();
                          await axios.put(`carts?userId=${userdetails.id}`, {
                            productId: cart.brandProductId,
                            productsId: cart.brandProductId,
                            cartPrice: cart.cartPrice,
                            quantity: cart.quantity.toString(),
                          });
                        } else {
                          var temp = _.find(data,['productId',cart.brandProductId])
                          temp.quantity = cart.quantity
                          if (!isLoggedIn) {
                            localStorage.setItem(
                              "cart_data",
                              JSON.stringify(data)
                            );
                          }
                        }
                        mutate(() => ({ data: [...data] }));
                      }
                    }}
                    onChange={onQtyEdit(index)}
                    type="number"
                    error={Boolean(cart.ErrorMessage)}
                  />
                  {Boolean(cart.ErrorMessage) && (
                    <FormHelperText style={{
                      marginTop: '3px',
                      color: 'red',
                      fontSize: 11,
                      width: "100%"
                    }} id="quantity">{cart.ErrorMessage}</FormHelperText>
                  )}
                </Box>
              </Box>
              {!isMobile && (
                <Box
                  display="flex"
                  marginTop={cart.customProduct ? "20px" : "unset"}
                  alignItems="center"
                >
                  <Box mr={1}>
                    <Tooltip title="Remove from my cart" aria-label="remove">
                      <Button
                        onClick={async () => {
                          _.remove(
                            data,
                            (o) => o.productId === cart.brandProductId
                          );
                          if (isLoggedIn) {
                            const axios = await AxiosConfigure.PrivateConfigiration();
                            await axios.delete(
                              `carts/${userdetails.id}`,
                              { data: [cart.brandProductId] }

                            );
                          } else {
                            localStorage.setItem(
                              "cart_data",
                              JSON.stringify(data)
                            );
                          }
                          await mutate(() => ({ data: [...data] }));
                        }}
                      >
                        Remove
                      </Button>
                    </Tooltip>
                  </Box>
                  {isLoggedIn && (
                    <Box>
                      <Tooltip title="Save for later" aria-label="remove">
                        <Button
                          fullWidth
                          color="primary"
                          onClick={async () => {
                            _.remove(
                              data,
                              (o) => o.brandProductId === cart.brandProductId
                            );
                            const axios = await AxiosConfigure.PrivateConfigiration();
                            await axios.put(
                              `carts/saveForLater/${userdetails.id}`,
                              {
                                productId: cart.brandProductId,
                              }
                            );
                            mutate(() => ({ data: [...data] }));
                            SFLmutate(() => ({ data: [...sfl] }));
                          }}
                        >
                          Save For Later
                        </Button>
                      </Tooltip>
                    </Box>
                  )}
                </Box>
              )}
              <Box display="flex" alignItems="center" lineHeight="1.2">
                {false ? (
                  <Skeleton width="40%" height="50%"></Skeleton>
                ) : (
                    <Box
                      display="flex"
                      css={{
                        "& > *": {
                          marginRight: 5,
                        },
                      }}
                    ></Box>
                  )}
              </Box>
            </Box>
          </Box>
          {isMobile && (
            <Box
              display="flex"
              marginTop={cart.customProduct ? "20px" : "unset"}
              alignItems="center"
            >
              <Box mr={1}>
                <Tooltip title="Remove from my cart" aria-label="remove">
                  <Button
                    onClick={async () => {
                      _.remove(
                        data,
                        (o) => o.productId === cart.brandProductId
                      );
                      if (isLoggedIn) {
                        const axios = await AxiosConfigure.PrivateConfigiration();
                        await axios.delete(
                          `carts/${userdetails.id}`,
                          { data: [cart.brandProductId] }
                        );
                      } else {
                        localStorage.setItem("cart_data", JSON.stringify(data));
                      }
                      await mutate(() => ({ data: [...data] }));
                    }}
                  >
                    Remove
                  </Button>
                </Tooltip>
              </Box>
              {isLoggedIn && (
                <Box>
                  <Tooltip title="Save for later" aria-label="remove">
                    <Button
                      fullWidth
                      color="primary"
                      onClick={async () => {
                        _.remove(
                          data,
                          (o) => o.brandProductId === cart.brandProductId
                        );
                        const axios = await AxiosConfigure.PrivateConfigiration();
                        await axios.put(
                          `carts/saveForLater/${userdetails.id}`,
                          {
                            productId: cart.brandProductId,
                          }
                        );
                        mutate(() => ({ data: [...data] }));
                        SFLmutate(() => ({ data: [...sfl] }));
                      }}
                    >
                      Save For Later
                    </Button>
                  </Tooltip>
                </Box>
              )}
            </Box>
          )}
          <Box
            display="flex"
            flexDirection="column"
            justify="space-between"
            alignItems="flex-end"
          >
            {!isMobile && (
              <Box>
                {false ? (
                  <Box textAlign="right">
                    <Skeleton width={70} height={20}></Skeleton>
                  </Box>
                ) : (
                    <Typography variant='h3'>
                      {<Pricingformat value={cart.totalPrice} />}
                    </Typography>
                  )}
              </Box>
            )}
            {/* <Box>
              <Box
                display="flex"
                marginTop={cart.customProduct ? "20px" : "unset"}
                alignItems="center"
              >
                <Box mr={1} flexGrow={1}>
                  <Tooltip title="Remove from my cart" aria-label="remove">
                    <Button
                      onClick={async () => {
                        _.remove(data, (o) => o.productId === cart.brandProductId);
                        if (isLoggedIn) {
                          const axios = await AxiosConfigure.PrivateConfigiration();
                          await axios.delete(`carts/${userdetails.id}?productsId=${cart.brandProductId}`);
                        } else {
                          localStorage.setItem("cart_data", JSON.stringify(data));
                        }
                        await mutate(() => ({ data: [...data] }));
                      }}
                    >
                      Remove
                    </Button>
                  </Tooltip>
                </Box>
                {isLoggedIn && <Box width="40%" flexGrow={1}>
                  <Tooltip title="Save for later" aria-label="remove">
                    <Button
                      fullWidth
                      color="primary"
                      onClick={async () => {
                        _.remove(data, (o) => o.brandProductId === cart.brandProductId);
                        const axios = await AxiosConfigure.PrivateConfigiration();
                        await axios.put(`carts/saveForLater/${userdetails.id}`, {
                          productId: cart.brandProductId
                        });
                        mutate(() => ({ data: [...data] }));
                        SFLmutate(() => ({ data: [...sfl] }))
                      }}
                    >
                      Save For Later
                    </Button>
                  </Tooltip>
                </Box>}
                <Box width="30%">
                  <TextField
                    value={cart.quantity}
                    onBlur={async () => {
                      if (data[index].quantity !== cart.quantity) {
                        if (isLoggedIn) {
                          const axios = await AxiosConfigure.PrivateConfigiration();
                          await axios.put(`carts?userId=${userdetails.id}`, {
                            productId: cart.brandProductId,
                            productsId: cart.brandProductId,
                            cartPrice: cart.cartPrice,
                            quantity: cart.quantity.toString()
                          });
                        } else {
                          _.find(data, 'productId', cart.brandProductId).quantity = cart.quantity
                          if (!isLoggedIn) {
                            localStorage.setItem("cart_data", JSON.stringify(data));
                          }
                        }
                        mutate(() => ({ data: [...data] }));
                      }
                    }}
                    onChange={onQtyEdit(index)}
                    type="number" />
                </Box>
              </Box>
            </Box> */}
          </Box>
        </Box>
      </Paper>
    </React.Fragment>
  ));
  return <div>{productBoxCard}</div>;
};

export default CartProductCard;
