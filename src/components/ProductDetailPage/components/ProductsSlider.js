import { makeStyles, Typography } from "@material-ui/core";
import React, { Fragment, useState } from "react";
import ProductGridCard from "../../ProductGridCard/ProductGridCard";
import SliderContentWrapper from "../../Homepage/SliderContentWrapper/SliderContentWrapper";
import SliderWrapper from "../../Homepage/SliderWrapper/SliderWrapper";


const ProductsSlider = ({ GroupIds, currentProductId, title }) => {
  const { data, isLoading } ={}
  const condition = data?.length > 4;

  const classes = useStyles(condition);
  const [sliderConfig, setSliderConfig] = useState({});
  const handleSliderConfig = (element) => {
    setSliderConfig(element);
  };
  function next() {
    sliderConfig.slickNext();
  }
  function previous() {
    sliderConfig.slickPrev();
  }
  const settings = {
    dots: false,
    infinite: condition,
    centerPadding: "10px",
    speed: 500,
    slidesToShow: 4,
    className: classes.relatedAccProducts,
    lazyLoad: condition,
    slidesToScroll: 1,
    rows: 1,
    centerMode: true,
    arrows: false,
    draggable: false,
    responsive: [
      {
        breakpoint: 1920,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: false,
        },
      },
    ],
  };
  return (
    <Fragment>
      <SliderContentWrapper
        title={
          Boolean(data?.length) && <Typography variant="h2">{title}</Typography>
        }
        showButton={condition}
        previous={previous}
        next={next}
      >
        <SliderWrapper
          settings={settings}
          handleSliderConfig={handleSliderConfig}
        >
          {data?.map((o) => (
            <React.Fragment key={o.productId}>
              <ProductGridCard loading={isLoading} ProductData={o} />
            </React.Fragment>
          ))}
        </SliderWrapper>
      </SliderContentWrapper>
    </Fragment>
  );
};

export default ProductsSlider;
/* eslint-disable no-dupe-keys */

const useStyles = makeStyles((theme) => ({
  relatedAccProducts: {
    "& .slick-list": {
      padding: "0 8px !important",
      "& .slick-track": {
        display: "flex",
        alignItems: "stretch",
        alignContent: "stretch",
        height: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        width: (props) => !props && "auto !important",
        padding: (props) => !props && "0 10px !important",
      },
      "& .slick-track": {
        display: "-webkit-box",
        display: "-ms-flexbox",
        display: "flex",
        WebkitBoxOrient: "horizontal",
        WebkitBoxDirection: "normal",
        MsFlexDirection: "row",
        flexDirection: "row",
        MsFlexWrap: "wrap",
        flexWrap: "wrap",
        WebkitBoxAlign: "stretch",
        MsFlexAlign: "stretch",
        alignItems: "stretch",
        MsFlexLinePack: "stretch",
        alignContent: "stretch",
        margin: "0",
        width: "100%",
        "& > div": {
          padding: theme.spacing(1),
          height: "auto",
        },
      },
      "& .slick-slide": {
        height: "auto",
        "& > div": {
          height: "100%",
        },
      },
    },
  },
}));
