import { lazy } from "react";
import { isMobileOnly } from "react-device-detect";

const component = isMobileOnly
  ? lazy(() =>
      import(
        /* webpackPrefetch: true */ "../components/ProductDetailPage/ProductDetailPage"
      )
    )
  : lazy(() =>
      import(
        /* webpackPrefetch: true */ "../components/ProductDetailPage/ProductDetailPage"
      )
    );
const ProductDetailPageConfig = {
  path: "/pd/:names/:productid",
  exact: true,
  component,
};

export default ProductDetailPageConfig;
