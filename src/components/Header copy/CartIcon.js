import React from "react";
import Badge from "@material-ui/core/Badge";
import ShoppingCart from "@material-ui/icons/ShoppingCart";
import UseCheckoutservices from "../../Services/CheckoutPageServices";
import Skeleton from "@material-ui/lab/Skeleton";
import { IconButton } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { isMobile } from "react-device-detect";
const CartIcon = ({ isLoading }) => {
  const { data, isLoading: cartLoading } = UseCheckoutservices();
  const history = useHistory();
  return (
    <IconButton
      onClick={() => {
        history.push("/checkout/cart");
      }}
    >
      <Badge
        color={!isLoading && !cartLoading ? "primary" : "default"}
        badgeContent={
          !isLoading && !cartLoading ? (
            data ? (
              data.length
            ) : (
              0
            )
          ) : (
            <Skeleton variant="circle" width={20} height={20} />
          )
        }
        showZero
      >
        <ShoppingCart
          style={{
            fontSize: isMobile ? 24 : 30,
          }}
        />
      </Badge>
    </IconButton>
  );
};

export default CartIcon;
