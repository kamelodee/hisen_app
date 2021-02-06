import React, { Fragment } from "react";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Container from "@material-ui/core/Container";
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import format from "date-fns/format";
import { isMobile } from "react-device-detect";
import UseHomepageservices from "../../../../Services/UseHomepageservices";
import Pricingformat from "../../../Pricingformat";
import { floatConvertion } from "../../checkoutUtils/cart.utils";
import Utils from "../../../../Utils";
const useStyles = makeStyles((theme) => ({
  statusLabel: {
    display: "inline",
    fontSize: "11px",
    fontWeight: "600"
  },
  statusDot: {
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    backgroundColor: "none",
    border: "2px solid #26a541",
    display: "inline-block",
    marginRight: "8px",
    marginTop: "-3px"
  },
  productDescription: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    "-webkit-box-orient": "vertical",
    "-webkit-line-clamp": 2
  }
}));
const Ordersuccess = ({ cartValue, cartData, orderData }) => {
  const classes = useStyles();
  const history = useHistory();
  const { push } = history;
  const { data: HeaderData } = UseHomepageservices("HEADER", true);
  const placeholderImage = HeaderData.placeholderImage

  return (
    <Fragment>
      <Container maxWidth="sm">
        <Box display="flex" justifyContent="center" flexDirection="column">
          <Box width="100%" py={2}>
            <Typography variant="h1" style={{ textAlign: "center" }} gutterBottom>Thank you for your order!</Typography>
            <Typography variant="body1" style={{ textAlign: "center" }}>Order confirmation and updates will be sent to {"Mobile"}</Typography>
          </Box>
          <Divider />
          <Box width="100%" py={2}>
            <Typography>{orderData.orderIdentifier}</Typography>
            <Typography>{format(new Date(orderData.orderedDate), "dd MMM yyyy")}</Typography>
            <Typography>Estimated Delivery by {format(new Date(orderData.orderDeliveryDate), "dd MMM yyyy")}</Typography>
          </Box>
          <Divider />
          <Box width="100%" py={2}>
            <Typography style={{ fontSize: 16, fontWeight: "600" }}>Payment status: POD (Pay on delivery)</Typography>
            <Box display="flex" mb={0.5}>
              <Box flexGrow={1}>
                <Typography variant='h5'>{'Total MRP'}</Typography>
              </Box>
              <Box fontWeight="400">
                <Typography variant='subtitle1' noWrap>{<Pricingformat value={cartValue.totalLP} />}</Typography>
              </Box>
            </Box>
            <Box display="flex" color="green" mb={0.5}>
              <Box flexGrow={1}>
                <Typography variant='h5'>{'Discount'}</Typography>
              </Box>
              <Box fontWeight="400">
                <Typography variant='subtitle1' noWrap>-{<Pricingformat value={floatConvertion(cartValue.totalLP - cartValue.subTotal, 2)} />}</Typography>
              </Box>
            </Box>
            <Box display="flex" mb={0.5}>
              <Box flexGrow={1}>
                <Typography variant='h5'>{'Subtotal'}</Typography>
              </Box>
              <Box fontWeight="400">
                <Typography variant='subtitle1' noWrap>{<Pricingformat value={cartValue.subTotal} />}</Typography>
              </Box>
            </Box>
            <Box display="flex" mb={0.5}>
              <Box flexGrow={1}>
                <Typography variant='h5'>Tax</Typography>
              </Box>
              <Box>
                <Typography variant='subtitle1' noWrap>{<Pricingformat value={cartValue.overallTax} />}</Typography>
              </Box>
            </Box>
            <Divider className={classes.divider} variant="middle" />
            <Box display="flex" mt={0.5}>
              <Box flexGrow={1}>
                <Typography variant='h5'>Total Amount</Typography>
              </Box>
              <Box fontWeight="600">
                <Typography variant='h5' noWrap> {<Pricingformat value={cartValue.grandTotal} />}</Typography>
              </Box>
            </Box>
          </Box>
          <Divider />
          <Box width="100%" py={2}>
            <Typography style={{ fontSize: 16, fontWeight: "600" }}>Your items ({cartData.length})</Typography>
            <Box display="flex" alignItems="center" width={"100%"}>
              <Box
                pr={1}
                py={2}
                height={"75px"}
                width={"75px"}
                css={{
                  "& img": { transition: "transform .4s" },
                  "&:hover img": {
                    transform: "scale(1.05)",
                    transformOrigin: "50% 50%",
                  },
                }}
              >
                <img
                  width="100%"
                  height="100%"
                  style={{ objectFit: "contain" }}
                  alt="Logo"
                  src={Utils.GetProductImages(cartData[0].productAssetss, placeholderImage)}
                />
              </Box>
              <Box width={isMobile ? "80%" : "80%"}>
                <Typography variant="body1" className={classes.productDescription} title={""}>
                  {cartData[0].productShortDescription}
                </Typography>
                <Typography
                  variant="subtitle2"
                  style={{ fontSize: "13px", }}
                >
                  {cartData[0].askedQuantity} x {<Pricingformat value={cartData[0].unitPrice} />}
                </Typography>
              </Box>
            </Box>
          </Box>
          {cartData.length > 1 && <Box py={1} display="flex" justifyContent="center">
            <Button color="primary" onClick={()=>{push(`/order-details/${orderData.orderIdentifier}`)}}>
              View more
          </Button>
          </Box>}
          <Divider />
          <Box width="100%" py={2}>
            <Typography style={{ fontSize: 16, fontWeight: "600" }}>Questions on your order?</Typography>
            <Typography>We're here for you. Let us know how we can help.</Typography>
            <Typography>Email: sales@growmax.io</Typography>
          </Box>
          <Box width="100%" py={2} alignItems="center" display="flex" flexDirection="column" justifyContent="center">
            <Button variant="outlined" color="primary" onClick={()=>{push(`/`)}}>
              Continue Shopping
          </Button>
          </Box>
        </Box>
      </Container>
    </Fragment>
  );
};

export default Ordersuccess;