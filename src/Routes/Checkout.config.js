import { lazy } from "react";


const CheckoutConfig = {
  path: "/checkout/:summary/:isbuynow",
  exact: true,
  component: lazy(() => import("../components/Checkout/Cart/checkout")),
};

 export default CheckoutConfig;
