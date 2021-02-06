import React from "react";
import { Redirect } from "react-router-dom";
// import ProductlistPageConfig, {
//   ProductListFilters,
// } from "./Productlispage.config";
import HomePageConfig from "./HomePage.config";
import OrdersPageConfig from "./OrdersPage.config";
import OrderDetailsPageConfig from "./OrderDetailsPage.config";
import CartConfig from "./Cart.config";
import CheckoutConfig from "./Checkout.config";
 import ProductDetailPageConfig from "./Productdetailpage.config";
// import ProfilePageConfig from "./ProfilePage.config";
import OrderSuccessConfig from "./OrderSuccessPage.config";
export default function UseAppRoutes() {
  const AppRouteConfig = [
    HomePageConfig,
   OrderDetailsPageConfig,
   ProductDetailPageConfig,
   CartConfig,
   OrderDetailsPageConfig,
   OrderSuccessConfig,
   CheckoutConfig,
   OrdersPageConfig
  ];
  const routes = [
    ...AppRouteConfig,
    {
      component: () => <Redirect to="/" />,
    },
  ];
  return routes;
}
