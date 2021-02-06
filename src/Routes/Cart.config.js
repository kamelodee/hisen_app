import { lazy } from "react";


const CartConfig = {
  path: "/checkout/cart",
  exact: true,
  component: lazy(() => import("../components/Checkout/Cart/Cart")),
};

export default CartConfig;
// 