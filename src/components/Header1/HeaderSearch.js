import Box from "@material-ui/core/Box";
import InputBase from "@material-ui/core/InputBase";
import makeStyles from "@material-ui/styles/makeStyles";
import LinearProgress from "@material-ui/core/LinearProgress";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import { Clear, ExpandMore, Search } from "@material-ui/icons";
import React, { Fragment, memo, useCallback, useState } from "react";

import Megamenu from "./Megamenu";
import Searchresults from "./SearchResult";
import Skeleton from "@material-ui/lab/Skeleton";
import { isTablet } from "react-device-detect";
import megadata from './megamenudata'
const HeaderSearch = () => {
  const classes = useStyles();
  const [showMegamenu, setShowMegamenu] = useState(false);
  const [SearchValue, setSearchValue] = useState("");
  const [ShowClear, SetShowClear] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [pagination, setpagination] = useState({
    from: 0,
    size: 24,
    total: 0,
  });
  const [ResultData, SetResultData] = useState([]);
  const [ShowResultSection, SetShowResultSection] = useState(false);
  

  const  Megamenudata = megadata

  const { MEGAMENU, MENUTYPE, placeholderImage } =  {MEGAMENU:{value:1}, MENUTYPE:"three",placeholderImage:""};
  const handleCloseMegaMenu = useCallback(() => {
    setShowMegamenu(false);
  }, []);
  const handleOpenMegaMenu = useCallback(() => {
    setShowMegamenu(true);
  }, []);
  const ClearAll = useCallback(() => {
    setSearchValue("");
    SetShowClear(false);
    setLoading(false);
    SetShowResultSection(false);
  }, []);
  const HandleSearchChange = useCallback(async (ev) => {
    try {
      const { value } = ev.target;
      setSearchValue(value);
      SetShowClear(true);
      setLoading(true);
      await getProducts(value);
    } catch (error) {
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  async function getProducts(value, from = 0, size = 24) {
    try {
      const data = await {}
      
      setpagination({
        ...pagination,
        total: data.hits.total,
      });
      SetResultData([]);
      SetShowResultSection(true);
    } catch (error) {}
  }
  return (
    <Fragment>
      <Box
        onMouseLeave={handleCloseMegaMenu}
        display="flex"
        alignItems="center"
        width="100%"
      >
        <Box position="relative" width="100%">
          <InputBase
            value={SearchValue}
            onChange={HandleSearchChange}
            startAdornment={
              !isTablet &&
              (MENUTYPE && Megamenudata ? (
                <Button
                  onMouseEnter={handleOpenMegaMenu}
                  disableRipple
                  disableTouchRipple
                  endIcon={
                    <Icon>
                      <ExpandMore />
                    </Icon>
                  }
                  variant="text"
                  color="default"
                >
                  categories
                </Button>
              ) : (
                <Skeleton height="34px" width="34.2%" variant="rect" />
              ))
            }
            endAdornment={
              ShowClear ? (
                <Box px={1}>
                <IconButton onClick={ClearAll} size="small">
                  <Clear fontSize="inherit" />
                </IconButton>
                </Box>
              ) : (
                <Box px={1}>
                <Icon>
                  <Search fontSize="inherit" />
                </Icon>
                </Box>
              )
            }
            fullWidth
            placeholder="Search by product code, name, variant and more"
            className={classes.Searbox}
            inputProps={{
              onClick: handleCloseMegaMenu,
            }}
          />
          {Loading && <LinearProgress className={classes.SearchBoxLoader} />}
          {MENUTYPE && showMegamenu && (
            <Megamenu
              handleCloseMegaMenu={handleCloseMegaMenu}
              menuValue={MEGAMENU?.value}
              placeholderImage={placeholderImage}
            />
          )}
        </Box>
      </Box>
      {ShowResultSection && (
        <Searchresults
          placeholderImage={placeholderImage}
          ClearAll={ClearAll}
          data={ResultData}
          pagination={pagination}
          SetShowResultSection={SetShowResultSection}
          setpagination={setpagination}
          getProducts={getProducts}
        />
      )}
    </Fragment>
  );
};

export default memo(HeaderSearch);
const useStyles = makeStyles((theme) => ({
  Searbox: {
    // padding: theme.spacing(0.5),
    // height: "100%",
    display: "flex",
    alignItems: "center",
    border: "1px solid rgba(0, 0, 0, 0.23)",
    "&:hover": {
      borderColor: "#000",
    },
    borderRadius: "4px",
    "& .MuiButton-root": {
      width: "184px",
      // marginRight: "12px",
      // alignItems: "end",
    },
    "& .MuiInputBase-input":{
      marginLeft: "10px"
    },
    "& .MuiButton-endIcon":{
      top: "-4px",
      position: "relative"
    }
  },
  SearchBoxLoader: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 1,
    top: "calc(100% - 2px)",
    marginRight: 2,
    marginLeft: 2,
  },
}));
