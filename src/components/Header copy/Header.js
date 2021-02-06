import React, { Fragment, lazy, memo, Suspense } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Box from "@material-ui/core/Box";
import Skeleton from "@material-ui/lab/Skeleton";
import { isMobileOnly } from "react-device-detect";
import HeaderSearch from "./HeaderSearch";
// import NavigationMenu from "./NavigationMenu";
import CartIcon from "./CartIcon";
import UserMenu from "./UserMenu";
const HeaderLogo = lazy(() => import("./HeaderLogo"));
const Header = ({ HeaderData, isLoading, setShowHeader }) => {
  // const [openMenu, setOpenMenu] = useState(false);
  // const toggleDrawer = useCallback((event) => {
  //   if (
  //     event &&
  //     event.type === "keydown" &&
  //     (event.key === "Tab" || event.key === "Shift")
  //   ) {
  //     return;
  //   }
  //   setOpenMenu(true);
  // }, []);
  return (
    <Fragment>
      <AppBar
        position="fixed"
        color="inherit"
        style={{ boxShadow: "0 13px 21px -9px rgba(0,0,0,.2)" }}
      >
        <Toolbar
          style={{
            backgroundColor: HeaderData?.primaryHeader?.bgColor,
          }}
          variant="dense"
        >
          <Box
            color={
              HeaderData?.primaryHeader?.iconColor || "rgba(0, 0, 0, 0.54)"
            }
          >
            {/* {(isMobileOnly || isTablet) && (
              <IconButton
                onClick={toggleDrawer}
                edge="start"
                color="inherit"
                aria-label="menu"
              >
                <MenuIcon />
              </IconButton>
            )} */}
          </Box>
          <Box
            display="flex"
            width="100%"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box width="61%">
              <Box width="160px" height="60px" maxHeight="60px">
                <Suspense fallback={<Skeleton variant="rect" height="100%" />}>
                  <HeaderLogo HeaderData={HeaderData} />
                </Suspense>
              </Box>
            </Box>
            {!isMobileOnly && (
              <Box width="100%">
                <HeaderSearch />
              </Box>
            )}
            <Box
              alignItems="center"
              width="75%"
              display="flex"
              justifyContent="flex-end"
              color={
                HeaderData?.primaryHeader?.iconColor || "rgba(0, 0, 0, 0.54)"
              }
            >
              <CartIcon isLoading={isLoading} />
              <Box m={1} />
              <UserMenu />
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
      {/* {(isMobileOnly || isTablet) && (
        <NavigationMenu
          HeaderData={HeaderData}
          openMenu={openMenu}
          MENUTYPE={HeaderData?.MEGAMENU?.value}
          setOpenMenu={setOpenMenu}
        />
      )} */}
    </Fragment>
  );
};

export default memo(Header);
