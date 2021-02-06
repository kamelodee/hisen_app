import makeStyles from "@material-ui/core/styles/makeStyles";
import { isMobileOnly } from "react-device-detect";

const ItemSliderStyles = makeStyles((theme) => ({
  checkSliderLength: {
    "& .slick-list": {
      margin:!isMobileOnly && "0 16px 0 8px !important",
      "& .slick-track": {
        width: (props) => !props && "auto !important",
        alignItems: "flex-start",
        flexDirection: "row",
        justifyContent: "stretch",
        height: "100%",
        margin: 0,
      },
      "& .slick-track > div": {
        padding: theme.spacing(1),
        height: "100%",
        display: "inline-block",
      },
      "& .slick-track > div > div": {
        height: "100%",
      },
    },
  },
  brandLink: {
    background: "#fff",
    width: "100%",
    height: "110px",
    overflow: "hidden",
    display: "flex",
    "&> div": {
      margin: "0 auto",
    },
  },
  Links: {
    textDecoration: "none",
    height: "100%",
  },
  sectionLoader: {
    paddingRight: theme.spacing(1),
    paddingLeft: theme.spacing(1),
  },
  loaderItem: {
    padding: theme.spacing(1),
  },
}));
export default ItemSliderStyles;
