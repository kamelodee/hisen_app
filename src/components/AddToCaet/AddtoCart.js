import React, { Fragment, useEffect, useState } from "react";
import UseCheckoutservices from "../../Services/CheckoutPageServices";
import find from "lodash/find";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import LinearProgress from "@material-ui/core/LinearProgress";
import Remove from "@material-ui/icons/Remove";
import Delete from "@material-ui/icons/Delete";
import Add from "@material-ui/icons/Add";
import each from "lodash/each";
import remove from "lodash/remove";
import AxiosConfigure from "../../Axios.configure";
import UseAuth from "../../Services/UseAuth";
import UseFetchUser from "../../Services/UseFetchuserdetails";
import Utils from "../../Utils";
import { isMobile } from "react-device-detect";
import { FormHelperText } from "@material-ui/core";

const AddtoCart = ({
  color = "primary",
  cartPrice,
  brandProductId,
  isPDP,
  styles = {},
  Buttonstyles = {},
  size = "medium",
  ...props
}) => {
  const [alredyincart, setalredyincart] = useState(null);
  const { data, mutate } = UseCheckoutservices();
  const [quantity, setquantity] = useState(0);
  const classes = useStyles();
  const [Loading, setLoading] = useState(false);
  const { data: isLoggedIn } = UseAuth();
  const { data: userdetails } = UseFetchUser(isLoggedIn);
  const [ErrorMessage, setErrorMessage] = useState(false);

  useEffect(() => {
    if (!alredyincart) {
      const datas = find(data, (o) => o.productId === brandProductId);
      setalredyincart(datas);
      setquantity(datas?.quantity || 0);
    }
  }, [data, alredyincart, brandProductId]);

  useEffect(() => {
    const datas = find(data, (o) => o.productId === brandProductId);
    if (alredyincart && !datas) {
      setalredyincart(null);
    } else {
      setalredyincart(datas);
      setquantity(datas?.quantity || 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  const AddToCartdata = async (e) => {
    setLoading(true);

    const opertaor = e.currentTarget.getAttribute("operator");
    const json = {
      productsId: brandProductId,
      productId: brandProductId,
      cartPrice,
    };
    switch (opertaor) {
      case "add":
        json.quantity = 1;
        if (json.quantity) {
          await addtocart(json, opertaor);
          setLoading(false);
        }
        break;
      case "update":
        json.quantity = quantity + 1;
        if (json.quantity) {
          await addtocart(json, opertaor);
          setLoading(false);
        }
        break;
      case "decrease":
        json.quantity = quantity - 1;
        if (json.quantity) {
          await addtocart(json, opertaor);
          setLoading(false);
        }
        break;
      case "delete":
        remove(data, (o) => o.productsId === json.productsId);
        if (!isLoggedIn) {
          localStorage.setItem("cart_data", JSON.stringify(data));
        } else {
          await deletecart(json);
        }
        await mutate(() => ({ data: [...data] }));
        setalredyincart(null);
        setLoading(false);
        break;
      default:
        break;
    }
  };
  async function deletecart(json) {
    const axios = await AxiosConfigure.PrivateConfigiration();
    await axios.delete(
      `/carts/${userdetails.id}`,
      { data: [json.productsId] }
    );
  }

  async function addtocart(json, opertaor) {
    if (isLoggedIn) {
      const axios = await AxiosConfigure.PrivateConfigiration();
      if (opertaor === "update" || opertaor === "decrease") {
        await axios.put(`carts?userId=${userdetails.id}`, json);
      } else {
        await axios.post(`carts?userId=${userdetails.id}`, json);
      }
    }
    
    setalredyincart(json);
    switch (opertaor) {
      case "add":
        json.quantity = 1;
        setquantity(parseFloat(json.quantity));
        if (!isLoggedIn) {
          localStorage.setItem("cart_data", JSON.stringify([...data, json]));
        }
        mutate({ data: [...data, json] }, false);
        break;
      case "update":
        json.quantity = quantity + 1;
        setquantity(parseFloat(json.quantity));
        each(data, (o) => {
          if (o.productId === json.productId) {
            o.quantity = json.quantity;
          }
        });
        if (!isLoggedIn) {
          localStorage.setItem("cart_data", JSON.stringify(data));
        }
        mutate(() => ({ data: [...data] }), false);
        break;
      case "decrease":
        json.quantity = quantity - 1;
        setquantity(parseFloat(json.quantity));
        each(data, (o) => {
          if (o.productId === json.productId) {
            o.quantity = json.quantity;
          }
        });
        if (!isLoggedIn) {
          localStorage.setItem("cart_data", JSON.stringify(data));
        }
        mutate(() => ({ data: [...data] }), false);
        break;
      default:
        break;
    }
  }
  const updateQuantity = async (event) => {
    const { step, min, max, value } = event.target;
    setErrorMessage(false);
    setquantity(value);
    if (Boolean(Utils.validateQuatity(step, min, max, value))) {
      setErrorMessage(Utils.validateQuatity(step, min, max, value));
      return;
    }
    setLoading(true);
    const json = {
      productsId: brandProductId,
      productId: brandProductId,
      quantity: value,
      cartPrice,
    };
    if (isLoggedIn) {
      const axios = await AxiosConfigure.PrivateConfigiration();
      await axios.put(`carts?userId=${userdetails.id}`, json);
    }
    each(data, (o) => {
      if (o.productId === json.productId) {
        o.quantity = value;
      }
    });
    if (!isLoggedIn) {
      localStorage.setItem("cart_data", JSON.stringify([...data]));
    }
    mutate(() => ({ data: [...data] }), false);
    setLoading(false);
  };
  return (
    <Fragment>
      {Loading && (
        <Box
          position="absolute"
          bottom={0}
          width="100%"
          zIndex="1"
          css={{ cursor:"not-allowed" }}
        >
          <LinearProgress
            style={{
              height: 2,
            }}
          />
        </Box>
      )}
      {alredyincart && (
        <Box width='100%'>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-around"
            width="100%"
            css={{ opacity: Loading ? 0.2 : 1, ...styles }}
            height={size === "large" ? "40px" : "34px"}
            border="1px solid rgb(224, 224, 224)"
            overflow="hidden"
            className={classes.addToCartBox}
          >
            {quantity === 1 ? (
              <IconButton
                onClick={AddToCartdata}
                operator="delete"
                color={color}
                style={{
                  flex: 2,
                }}
              >
                <Delete />
              </IconButton>
            ) : (
              <IconButton
                onClick={AddToCartdata}
                operator="decrease"
                color={color}
                style={{
                  flex: 2,
                }}
              >
                <Remove />
              </IconButton>
            )}
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-evenly"
              height="100%"
              flex="5"
              css={{}}
            >
              <FormControl style={{ height: "100%", flex: 5 }}>
                <InputBase
                  variant="standard"
                  type="number"
                  error={Boolean(ErrorMessage)}
                  helperText={ErrorMessage}
                  style={{
                    textAlign: "center",
                  }}
                  onChange={updateQuantity}
                  className={classes.qtyInputBase}
                  value={quantity}
                  inputProps={{
                    min: 1,
                    max: 9999999,
                    step: 1,
                  }}
                />
              </FormControl>
            </Box>

            <IconButton
              onClick={AddToCartdata}
              operator="update"
              color={color}
              style={{
                flex: 2,
              }}
            >
              <Add />
            </IconButton>
          </Box>
        </Box>
      )}
        {Boolean(ErrorMessage) && (
          <FormHelperText
            style={{
              marginTop: 5,
              color: "red",
              textAlign: "center",
              transform: isPDP && isMobile ? "rotate(180deg)" : "",
            }}
            id="quantity"
          >
            {ErrorMessage}
          </FormHelperText>
        )}
      {!alredyincart && (
        <Button
          operator="add"
          onClick={AddToCartdata}
          disabled={Loading}
          fullWidth
          style={{ ...styles, ...Buttonstyles }}
          color={color}
          {...props}
        >
          Add To cart
        </Button>
      )}
    </Fragment>
  );
};

export default AddtoCart;

const useStyles = makeStyles((theme) => ({
  qtyInputBase: {
    height: "100%",
    borderLeft: "1px solid #e0e0e0",
    borderRight: "1px solid #e0e0e0",
    "& input": {
      textAlign: "center",
      padding: 0,
    },
    "& input::-webkit-outer-spin-button": {
      "-webkit-appearance": "none",
      margin: 0,
    },
    "& input::-webkit-inner-spin-button": {
      "-webkit-appearance": "none",
      margin: 0,
    },
    "& input[type=number]": {
      "-moz-appearance": "textfield",
    },
  },
  addToCartBox: {
    borderRadius: `${theme.shape.borderRadius}px`,
    // width: "95%",
  },
}));
