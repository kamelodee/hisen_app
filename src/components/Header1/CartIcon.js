import React from "react";
import Badge from "@material-ui/core/Badge";
import ShoppingCart from "@material-ui/icons/ShoppingCart";

import Skeleton from "@material-ui/lab/Skeleton";
import { IconButton } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { isMobile } from "react-device-detect";
import { useStateValue } from '../../StateProvider'
const CartIcon = ({ isLoading }) => {
    const [{   basket,user }] = useStateValue()
  const { data, isLoading: cartLoading } =[];
  const history = useHistory();
  return (
    <IconButton
      onClick={() => {
        history.push("/checkout");
      }}
    >
      <Badge
      
        color={!isLoading && !cartLoading ? "primary" : "default"}
        badgeContent={
          !isLoading && !cartLoading ? (
            basket ? (
                basket.length
            ) : (
              0
            )
          ) : (
            <Skeleton  variant="circle" width={20} height={20} />
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
