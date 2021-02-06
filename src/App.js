import React, { Fragment, memo, Suspense, useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Route, Router, Switch } from "react-router-dom";
import History from "./@history";
import UseAppRoutes from "./Routes/UseAppRoutes";
import Header from "./components/Header/Header";
import Box from "@material-ui/core/Box";
import CssBaseline from "@material-ui/core/CssBaseline";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import UseAppTheme from "./components/UseAppTheme";

import ScrollReset from "./components/Scrollreset";
const App = () => {
  const UseHomepageservices ={data:{
    SITETITLE:"hisense",
    FavIcon:"",
    SITEDESCRIPTION:"hisense company ",
   
  },
  restConfigdata:{ 
    primaryColor:"#465858",
  },
  isLoading:false
}
const styletheme = {
  primaryColor:"#009b92",
  backgroundColor:"#eee"
}
  const { data, isLoading } = UseHomepageservices;
  const routes = UseAppRoutes();
  const { SITETITLE, FavIcon, SITEDESCRIPTION, ...restConfigdata } = data;
  const theme = UseAppTheme(styletheme);
  const [ShowHeader, setShowHeader] = useState(true);

  return (
    <Fragment>
      <Router history={History}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {!isLoading && (
            <HelmetProvider context={{}}>
              <Helmet defer={false}>
                <title>{SITETITLE || "apptinocommerce"}</title>
                <link rel="icon" href={FavIcon} />
                <meta name="description" content={SITEDESCRIPTION} />
                <meta property="og:title" content={SITETITLE} />
              </Helmet>
            </HelmetProvider>
          )}
          {ShowHeader && <Header HeaderData={data} isLoading={isLoading} />}

          <Box height="calc(100vh - 64px)" overflow="auto" id="App">
            <ScrollReset setShowHeader={setShowHeader} />
            {!isLoading && (
              <Suspense fallback={""}>
                <Switch>
                  {routes.map((route, i) => (
                    <Route
                      key={i}
                      path={route.path}
                      exact={route.exact}
                      component={route.component}
                    />
                  ))}
                </Switch>
              </Suspense>
            )}
          </Box>
        </ThemeProvider>
      </Router>
    </Fragment>
  );
};

export default memo(App);
