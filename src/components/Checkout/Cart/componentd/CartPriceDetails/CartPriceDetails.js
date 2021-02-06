import React from "react";
import { Box, Divider, Typography, Card, CardContent } from "@material-ui/core";
import useStyles from "./CartPriceDetails.css";
import { floatConvertion } from "../../../checkoutUtils/cart.utils";
import Pricingformat from "../../../../Pricingformat";
import Skeleton from "@material-ui/lab/Skeleton";

const CartPriceDetails = ({
  cartValue,
  loading,
  currency,
  customSymbol,
  mt = "1",
  taxExemption,
}) => {
  const classes = useStyles();
  const priceDetails = (
    <React.Fragment>
      <Box id="priceDetails" mt={mt} mb={2} display="flex">
        <Typography variant="h3">{`Price Details `}</Typography>
        <Box mr={0.5} />
        <Typography>{`(${cartValue.totalItems} ${
          cartValue.totalItems === 1 ? " Item" : " Items"
        })`}</Typography>
      </Box>
      <Card>
        <CardContent className={classes.cardContentPriceDetails}>
          {/* <Box display="flex">
            <Box flexGrow={1}>
              <Typography variant='h5'>Total Items</Typography>
            </Box>
            <Box fontWeight="400">
              <Typography variant='subtitle1' noWrap>{cartValue.totalItems}</Typography>
            </Box>
          </Box> */}
          <Box display="flex">
            <Box flexGrow={1}>
              <Typography variant="h5">{"Total MRP"}</Typography>
            </Box>
            <Box fontWeight="400">
              {!loading ? (
                <Typography variant="subtitle1" noWrap>
                  {<Pricingformat value={cartValue.totalLP} />}
                </Typography>
              ) : (
                <Skeleton width="30%" height="20%" />
              )}
            </Box>
          </Box>
          {(floatConvertion(cartValue.totalLP - cartValue.subTotal,2)>0)&&
          <Box display="flex" color="green">
            <Box flexGrow={1}>
              <Typography variant="h5">{"Discount"}</Typography>
            </Box>
            <Box fontWeight="400">
              {!loading ? (
                <Typography variant="subtitle1" noWrap>
                  -
                  {
                    <Pricingformat
                      value={floatConvertion(
                        cartValue.totalLP - cartValue.subTotal,
                        2
                      )}
                    />
                  }
                </Typography>
              ) : (
                <Skeleton width="30%" height="20%" />
              )}
            </Box>
          </Box>}
          <Box display="flex">
            <Box flexGrow={1}>
              <Typography variant="h5">{"Subtotal"}</Typography>
            </Box>
            <Box fontWeight="400">
              {!loading ? (
                <Typography variant="subtitle1" noWrap>
                  {<Pricingformat value={cartValue.subTotal} />}
                </Typography>
              ) : (
                <Skeleton width="30%" height="20%" />
              )}
            </Box>
          </Box>
          <Box display="flex">
            <Box flexGrow={1}>
              <Typography variant="h5">Tax</Typography>
            </Box>
            <Box>
              {taxExemption ? (
                <Typography> N/A</Typography>
              ) : !loading ? (
                <Typography variant="subtitle1" noWrap>
                  {<Pricingformat value={cartValue.overallTax} />}
                </Typography>
              ) : (
                <Skeleton width="30%" height="20%" />
              )}
            </Box>
          </Box>
          <Divider className={classes.divider} variant="middle" />
          <Box display="flex">
            <Box flexGrow={1}>
              <Typography variant="h3">Total Amount</Typography>
            </Box>
            <Box fontWeight="600">
              {!loading ? (
                <Typography
                  variant="h2"
                  style={{
                    fontWeight: 500,
                  }}
                  noWrap
                >
                  {" "}
                  {<Pricingformat value={cartValue.grandTotal} />}
                </Typography>
              ) : (
                <Skeleton width="30%" height="20%" />
              )}
            </Box>
          </Box>
        </CardContent>
      </Card>
    </React.Fragment>
  );
  return <div>{priceDetails}</div>;
};

export default CartPriceDetails;
