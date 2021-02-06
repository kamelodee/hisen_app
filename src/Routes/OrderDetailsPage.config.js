import { lazy } from "react";


const OrderDetailsPageConfig = {
  path: "/order-details/:orderIdentifier",
  exact: true,
  component: lazy(() => import("../components/Orders/OrderDetails")),
};

export default OrderDetailsPageConfig;
