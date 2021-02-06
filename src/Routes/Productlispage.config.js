// import { lazy } from "react";
// import { isMobileOnly } from "react-device-detect";

// const component = isMobileOnly
//   ? lazy(() =>
//       import(
//         /* webpackPrefetch: true */ "../MobileLayout/ProductListPageMobile/ProductListPage.mobile"
//       )
//     )
//   : lazy(() =>
//       import(
//         /* webpackPrefetch: true */ "../DesktopLayout/ProductListPage/ProductListPage.js"
//       )
//     );
// const ProductListPageConfig = {
//   path: "/p/:action/:actionparam/:pagenumber/:sort?",
//   exact: true,
//   component,
// };
// export const ProductListFilters = {
//   path: "/pf/:action/:actionparam/:pagenumber/:sort?",
//   exact: true,
//   component: lazy(() =>
//     import(
//       /* webpackPrefetch: true */ "../MobileLayout/ProductListPageMobile/ProductFilter"
//     )
//   ),
// };
// export default ProductListPageConfig;
