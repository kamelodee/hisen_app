import { lazy } from "react";


const OrdresPageConfig = {
  path: "/orders/:pagenumber",
  exact: true,
  component: lazy(() => import("../components/Orders/Orders")),
};

 export default OrdresPageConfig;
