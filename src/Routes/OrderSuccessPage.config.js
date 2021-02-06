import { lazy } from "react";


const OrdresPageConfig = {
  path: "/order-success",
  exact: true,
  component: lazy(() => import("../components/Orders/Orders")),
};

export default OrdresPageConfig;
