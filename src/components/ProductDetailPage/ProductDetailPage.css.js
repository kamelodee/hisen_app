import { makeStyles } from "@material-ui/core/styles";

const ProductDetailPageStyles = makeStyles((theme) => ({
  breadcrumbSection: {
    paddingTop: theme.spacing(1),
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
  },
  pdpProductDetail: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    // borderBottom: `1px solid ${theme.palette.border}`
  },
  variantList: {
    display: "flex",
    WebkitBoxPack: "start",
    MsFlexPack: "start",
    justifyContent: "flex-start",
    MsFlexWrap: "wrap",
    flexWrap: "wrap",
    WebkitBoxOrient: "horizontal",
    WebkitBoxDirection: "normal",
    MsFlexDirection: "row",
    flexDirection: "row",
    marginTop: "5px",
    "& .MuiGrid-item:nth-child(odd)": {
      marginRight: "8%",
    },
  },
  variantListItem: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    marginBottom: theme.spacing(1.5),
    paddingBottom: theme.spacing(1.5),
    MsFlexPreferredSize: "42%",
    flexBasis: "42%",
  },
  pdpPriceSection: {
    alignItems: "center",
    "& h5": {
      fontSize: "20px",
    },
    "&>div": {
      width: "100%",
    },
  },
  pdpDescriptionSection: {
    height: "100%",
    marginBottom:theme.spacing(1)
  },
  productAttributesList: {
    flexWrap: "wrap",
    WebkitBoxOrient: "horizontal",
    flexDirection: "row",
    display: "flex",
  },
  productDiscontinued: {
    background: "#f443364d",
    color: "#F44336",
    marginRight: theme.spacing(1),
    paddingRight: theme.spacing(1.5),
    paddingLeft: theme.spacing(1.5),
    borderRadius: "4px",
  },
  hrefs: {
    color: theme.palette.primary.main,
  },
  productInternal: {
    background: "rgb(205, 226, 206)",
    color: "rgb(56, 142, 60)",
    marginRight: theme.spacing(1),
    paddingRight: theme.spacing(1.5),
    paddingLeft: theme.spacing(1.5),
    borderRadius: "4px",
  },
}));
export default ProductDetailPageStyles;
