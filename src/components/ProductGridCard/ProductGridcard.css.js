/* eslint-disable no-dupe-keys */
import { makeStyles } from "@material-ui/core/styles";
import { isMobileOnly } from "react-device-detect";

const ProductGridCardStyles = makeStyles((theme) => ({
  productSectionCard: {
    transition: ".5s",
    borderRight: isMobileOnly && `1px solid ${theme.palette.border}`,
    borderBottom: isMobileOnly && `1px solid ${theme.palette.border}`,
    boxShadow: theme.shadows[0],
    backgroundColor: theme.palette.background.paper,
    boxSizing: "border-box",
    display: "flex",
    WebkitBoxOrient: "vertical",
    flexDirection: "column",
    WebkitBoxAlign: "stretch",
    alignItems: "stretch",
    alignContent: "stretch",
    WebkitBoxPack: "justify",
    justifyContent: "space-between",
    WebkitBoxDirection: "normal",
    width: "100%",
    height: "100%",
    textAlign: "left",
    position: "relative",
    verticalAlign: "top",
    overflow: "hidden",
    margin: 0,
    flexWrap: "unset",
    cursor: "pointer",
    "&:hover": {
      boxShadow: !isMobileOnly && theme.shadows[1],
    },
  },
 
  addtocartbutton: {
    transition: ".5s",
    backgroundColor: isMobileOnly && theme.palette.primary.main + "!important",
    color: isMobileOnly && theme.palette.primary.contrastText + "!important",
    "&:hover": {
      boxShadow: !isMobileOnly && theme.shadows[1],
      backgroundColor: !isMobileOnly && theme.palette.primary.main,
      color: !isMobileOnly && theme.palette.primary.contrastText,
    },
  },
  priceSection: {
    "& h5": {
      fontSize: "20px",
      fontWeight: 600,
    },
    "& p": {
      padding: "0 5px",
    },
  },
  productTitle: {
    display: "block",
    maxHeight: "66px",
    lineHeight: "1.4",
    overflow: "hidden!important",
    textOverflow: "ellipsis",
    whiteSpace: "normal",
    fontSize: "16px",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 3,
    color:"#000",
    // marginBottom: "12px",
   
  },
  proImgContainer: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    margin: "0",
    boxSizing: "border-box",
    flexWrap: "wrap",
  },
  productGridAddtocart: {
    position: "relative",
    paddingRight: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(1),
  },
  variantsView: {
    borderTop: `1px solid ${theme.palette.border}`,
  },
  variantsInner: {
    display: "flex",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    borderBottom: `1px solid ${theme.palette.border}`,
    // "& .code":{
    //   width: "35px"
    // },
    // "& .codeValue":{
    //   width: "calc(100% - 35px)"
    // },
    "&:nth-child(odd)": {
      borderRight: `1px solid ${theme.palette.border}`,
    },
  },
  cardThreeProductTitle: {
    display: "block",
    display: "-webkit-box",
    maxHeight: "54px",
    lineHeight: "1.4",
    WebkitLineClamp: "3",
    overflow: "hidden!important",
    textOverflow: "ellipsis",
    whiteSpace: "normal",
    "-webkit-box-orient": "vertical",
  },
}));

export default ProductGridCardStyles;
