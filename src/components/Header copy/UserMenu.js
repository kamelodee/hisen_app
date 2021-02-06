import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import PermIdentity from "@material-ui/icons/PermIdentity";
import Person from "@material-ui/icons/Person";
import AccountBox from "@material-ui/icons/AccountBox";
import PowerSettingsNew from "@material-ui/icons/PowerSettingsNew";
import React, { Fragment, useState } from "react";
import { isMobile } from "react-device-detect";
import { Link } from "react-router-dom";
import { mutate } from "swr";

import UseAuth from "../../Services/UseAuth";
import UseFetchUser from "../../Services/UseFetchuserdetails";
import Utils from "../../Utils";
import LoginDialog from "./LoginDialog";

const UserMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDialog, setopenDialog] = useState(false);
  const { data: isLoggedIn } = UseAuth();
  const { data: userdetails, isLoading } = UseFetchUser(isLoggedIn);
  const handleClickOpenDialog = () => {
    setopenDialog(true);
    setAnchorEl(null);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Fragment>
      {!isLoggedIn ? (
        <IconButton
          onClick={handleClick}
          edge="end"
          color="inherit"
          aria-label="menu"
        >
          <PermIdentity
            style={{
              fontSize: isMobile ? 24 : 30,
            }}
          />
        </IconButton>
      ) : (
        <IconButton
          onClick={handleClick}
          edge="end"
          color="inherit"
          aria-label="menu"
        >
          <Avatar src={isLoading ? "" : userdetails.picture || ""}>
            {!isLoading &&
              userdetails.name &&
              Utils.getInitial(userdetails.name)}
          </Avatar>
        </IconButton>
      )}
      <Menu
        id="login-menu"
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        {!isLoggedIn && (
          <MenuItem onClick={handleClickOpenDialog}>
            <ListItemIcon>
              <Person />
            </ListItemIcon>
            <ListItemText primary="Login" />
          </MenuItem>
        )}
        {isLoggedIn && (
          <Box
            padding="2px"
            display="flex"
            flexDirection="column"
            minWidth="256px"
            textAlign="center"
            alignItems="center"
          >
            <Avatar
              imgProps={{}}
              src={!isLoading && (userdetails.picture || "")}
            >
              {!isLoading &&
                userdetails.name &&
                Utils.getInitial(userdetails.name)}
            </Avatar>
            <Box my={2}>
              <Typography gutterBottom variant="h3" color="primary">
                {!isLoading && userdetails.name}
              </Typography>
              <Typography gutterBottom variant="body2" display="block">
                {!isLoading && userdetails.email}
              </Typography>
            </Box>
            <List
              component="nav"
              style={{
                width: "100%",
              }}
            >
              <ListItem
                component={Link}
                to="/orders/1"
                onClick={() => {
                  setAnchorEl(null);
                }}
                button
                divider
              >
                <ListItemIcon
                  style={{
                    fontSize: 24,
                  }}
                >
                  <LibraryBooks />
                </ListItemIcon>
                <ListItemText disableTypography primary="Orders" />
              </ListItem>
              <ListItem
                component={Link}
                to="/profile"
                onClick={() => {
                  setAnchorEl(null);
                }}
                button
                divider
              >
                <ListItemIcon
                  style={{
                    fontSize: 24,
                  }}
                >
                  <AccountBox />
                </ListItemIcon>
                <ListItemText disableTypography primary="My Profile" />
              </ListItem>
              <ListItem
                component={Link}
                to="/"
                onClick={() => {
                  localStorage.removeItem("access token");
                  mutate("auth", false);
                  setAnchorEl(null);
                }}
                button
              >
                <ListItemIcon
                  style={{
                    fontSize: 24,
                  }}
                >
                  <PowerSettingsNew />
                </ListItemIcon>
                <ListItemText disableTypography primary="Logout" />
              </ListItem>
            </List>
          </Box>
        )}
      </Menu>
      <LoginDialog openDialog={openDialog} setopenDialog={setopenDialog} />
    </Fragment>
  );
};

export default UserMenu;
