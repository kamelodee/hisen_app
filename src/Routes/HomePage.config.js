import { lazy } from "react";


const HomePageConfig = {
  path: "/",
  exact: true,
  component: lazy(() => import("../components/Homepage/Homepage")),
};

export default HomePageConfig;
