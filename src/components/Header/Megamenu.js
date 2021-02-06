import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Icon from "@material-ui/core/Icon";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import ArrowForwardIos from "@material-ui/icons/ArrowForwardIos";
import React, { useEffect, useState, memo } from "react";
import map from "lodash/map";
import groupBy from "lodash/groupBy";
import find from "lodash/find";
import isArray from "lodash/isArray";
import { Link } from "react-router-dom";
import megamenudata from "./megamenudata";
const data = megamenudata
const Megamenu = ({

  menuValue,
  handleCloseMegaMenu,
  placeholderImage,
}) => {
  const threeMenu = menuValue === 3;
  const twoMenu = menuValue === 2;
  const singleMenu = menuValue === 1;
  const [detailData, setdetailData] = useState({});
  const classes = MegaMenuStyles();
  let menuWidth;
  if (threeMenu) {
    menuWidth = "150%";
  } else if (twoMenu) {
    menuWidth = "100%";
  } else {
    menuWidth = "50%";
  }
  useEffect(() => {
    if (data) {
      console.log(data)
      if (threeMenu) {
        const datas = map(
          groupBy(data.listSubCategory, "categoryId.majorCategoryId.name")
        );
        setdetailData(groupBy(datas[0], "categoryId.name"));
      }
      if (twoMenu) {
        const datas = map(
          groupBy(data.data.listSubCategory, "categoryId.name")
        );
        setdetailData(groupBy(datas[0], "categoryId.name"));
      }
    }
  }, [data, threeMenu, twoMenu]);
  const handleHover = (data) => () => {
    if (threeMenu) {
      setdetailData(groupBy(data, "categoryId.name"));
    } else {
      setdetailData(data);
    }
  };
  return (
    <Box
      position="absolute"
      component={Paper}
      onMouseLeave={handleCloseMegaMenu}
      variant="outlined"
      square
      bgcolor="#fff"
      height="450px"
      overflow="hidden"
      width={menuWidth}
      zIndex={9999}
    >
      <Box
        justifyContent="space-between"
        height="100%"
        display="flex"
        overflow="hidden"
      >
        <Box
          overflow="auto"
          width={twoMenu ? "50%" : singleMenu ? "100%" : "30%"}
        >
          <List dense>
            {data &&
              !threeMenu &&
              !twoMenu &&
              map(data.data.listSubCategory, (o, i) => (
                <ListItem
                  component={Link}
                  to={`/p/s/${i}/1`}
                  button
                  onClick={handleCloseMegaMenu}
                  //divider={findLastIndex(map(data.data.listSubCategory)) !== i}
                  key={i}
                >
                  <ListItemAvatar className={classes.megaMenuListItemAvatar}>
                    <Avatar
                      variant="square"
                      className={classes.megaMenuAvatar}
                      imgProps={{
                        style: {
                          objectFit: "contain",
                        },
                      }}
                      src={o.iconSource || placeholderImage}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    className={classes.megaMenuListItem}
                    primary={o.name}
                  />
                </ListItem>
              ))}
            {data &&
              (threeMenu || twoMenu) &&
              map(  
                groupBy(
                  data.data.listSubCategory,
                  threeMenu
                    ? "categoryId.majorCategoryId.name"
                    : "categoryId.name"
                ),
                (o, i) => (
                  <ListItem
                    component={Link}
                    onClick={handleCloseMegaMenu}
                    to={threeMenu ? `/p/m/${i}/1` : `/p/c/${i}/1`}
                    selected={
                      threeMenu
                        ? Boolean(
                            find(
                              detailData,
                              (o) => o.categoryId.majorCategoryId.name === i
                            )
                          )
                        : find(
                            detailData,
                            (o) => o.categoryId.majorCategoryId.name === i
                          )
                    }
                    onMouseEnter={handleHover(o)}
                    button
                    key={i}
                  >
                    <ListItemAvatar className={classes.megaMenuListItemAvatar}>
                      <Avatar
                        variant="square"
                        className={classes.megaMenuAvatar}
                        imgProps={{
                          style: {
                            objectFit: "contain",
                          },
                        }}
                        src={o[0].categoryId?.iconSource || placeholderImage}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      className={classes.megaMenuListItem}
                      primary={i}
                    />
                    <ListItemSecondaryAction>
                      <Icon fontSize="inherit">
                        <ArrowForwardIos fontSize="inherit" />
                      </Icon>
                    </ListItemSecondaryAction>
                  </ListItem>
                )
              )}
          </List>
        </Box>
        {(threeMenu || twoMenu) && (
          <Box
            display="flex"
            flexDirection={twoMenu ? "column" : "row"}
            width={twoMenu ? "50%" : "70%"}
            p={1}
            justifyContent={threeMenu ? "space-between" : ""}
            overflow="auto"
            flexWrap="wrap"
          >
            {threeMenu &&
              map(detailData, (o, i) => i).map((i) => (
                <Box width="32%" key={i}>
                  <Typography
                    style={{
                      textDecoration: "none",
                    }}
                    component={Link}
                    to={`/p/c/${i}/1`}
                    gutterBottom
                    variant="subtitle2"
                  >
                    {i}
                  </Typography>
                  <Box my={1} elevation={1}>
                    {detailData[i].map((o) => {
                      return (
                        <List dense key={o.id} disablePadding>
                          <ListItem
                            button
                            component={Link}
                            onClick={handleCloseMegaMenu}
                            to={`/p/s/${o.name}/1`}
                            // divider={
                            //   findLastIndex(detailData[i]) !==
                            //   indexOf(detailData[i], o)
                            // }
                          >
                            <ListItemAvatar
                              className={classes.megaMenuListItemAvatar}
                            >
                              <Avatar
                                variant="square"
                                className={classes.megaMenuAvatar}
                                imgProps={{
                                  style: {
                                    objectFit: "contain",
                                  },
                                }}
                                src={o.iconSource || placeholderImage}
                              />
                            </ListItemAvatar>
                            <ListItemText
                              className={classes.megaMenuListItem}
                              primary={o.name}
                            />
                          </ListItem>
                        </List>
                      );
                    })}
                  </Box>
                </Box>
              ))}
            {twoMenu &&
              isArray(detailData) &&
              detailData.map((o) => {
                return (
                  <List dense key={o.id} disablePadding>
                    <ListItem
                      button
                      component={Link}
                      to={`/p/s/${o.name}/1`}
                      onClick={handleCloseMegaMenu}

                      // divider={
                      //   findLastIndex(detailData) !== indexOf(detailData, o)
                      // }
                    >
                      <ListItemAvatar
                        className={classes.megaMenuListItemAvatar}
                      >
                        <Avatar
                          variant="square"
                          className={classes.megaMenuAvatar}
                          imgProps={{
                            style: {
                              objectFit: "contain",
                            },
                          }}
                          src={o.iconSource || placeholderImage}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        className={classes.megaMenuListItem}
                        primary={o.name}
                      />
                    </ListItem>
                  </List>
                );
              })}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default memo(Megamenu);

const MegaMenuStyles = makeStyles((theme) => ({
  megaMenuListItemAvatar: {
    minWidth: 16,
    maxHeight: 25,
    maxWidth: 25,
    padding: 4,
  },
  megaMenuAvatar: {
    width: "100%",
    height: "100%",
  },
  megaMenuListItem: {
    padding: theme.spacing(0.5),
  },
}));
