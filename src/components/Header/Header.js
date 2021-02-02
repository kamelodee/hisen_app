import React, { Fragment, lazy, memo, Suspense } from 'react';

import { Link } from 'react-router-dom';

import './Header.css'
import SearchIcon from '@material-ui/icons/Search';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import AppBar from "@material-ui/core/AppBar";
import { isMobileOnly } from "react-device-detect";
import Toolbar from "@material-ui/core/Toolbar";
import Box from "@material-ui/core/Box";
import Skeleton from "@material-ui/lab/Skeleton";
import { useStateValue } from '../../StateProvider'
import { auth } from '../../Firebase';
import { Email } from '@material-ui/icons';
import HeaderSearch from "./HeaderSearch";
// import NavigationMenu from "./NavigationMenu";
import CartIcon from "./CartIcon";
import UserMenu from "./UserMenu";
const HeaderLogo = lazy(() => import("./HeaderLogo"));
const Header = ({ HeaderData, isLoading, setShowHeader }) => {
    const [{   basket,user }] = useStateValue()
    const login = () => {
        if (user) {
        auth.signOut()
    }
    }
    return (
        <Fragment>

<AppBar
        position="fixed"
        color="inherit"
        style={{ boxShadow: "0 13px 21px -9px rgba(0,0,0,.2)" }}
      >

<Toolbar
          style={{
            boxShadow: "0 13px 21px -9px rgba(0,0,0,.2)"
          }}
          variant="dense"
        >

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
             
            >
             <CartIcon isLoading={isLoading} />
              <Box m={1} />
              <UserMenu />
            </Box>

          </Box>



            </Toolbar>
</AppBar>
      </Fragment>
    );
}
 

 
export default Header;