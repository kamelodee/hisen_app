import makeStyles from "@material-ui/core/styles/makeStyles";

const BannerSliderStyles = makeStyles((theme) => ({
  homePageFontH1: {
    fontSize: "28px",
  },
  homePageFontH2: {
    fontSize: "20px",
  },
  homePageFontH3: {
    fontSize: "16px",
  },
  sliderDescription: {
    fontSize: 16,
  },
  sliderLink: {
    fontSize: 14,
  },
  slickThumb: {
    "& li": {
      "& >.pagination-dots": {
        backgroundColor: "white",
        width: 33,
        height: 6,
        marginLeft: "-19px",
      },
      opacity: 0.4,
      margin: "0 9px !important",
      "&.slick-active": {
        "& >.pagination-dots": {
          height: 7,
        },
        opacity: 1,
      },
    },
  },
  SliderTextButton: {
    padding: "8px 0",
    transition: ".2s",
    fontSize: 14,
    "& :hover": {
      "&>span": {
        color: theme.palette.primary.main,
      },
      "& #icon": {
        transform: "translate(3px, 0px)",
      },
    },
  },
}));

export default BannerSliderStyles;
