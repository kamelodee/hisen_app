import { Box, Grid, Paper, Typography, useTheme } from "@material-ui/core";
import React, { Fragment, memo, useState } from "react";
import { isMobileOnly } from "react-device-detect";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useHistory } from "react-router-dom";
import SliderContentWrapper from "./SliderContentWrapper/SliderContentWrapper";
import SliderWrapper from "./SliderWrapper/SliderWrapper";
import UseHomepageservices from "../../Services/UseHomepageservices";
import ItemSliderStyles from "./CollectionSlider/CollectionSlider.css";
import toNumber from "lodash/toNumber";

const CustomImageLink = ({ PropertyData }) => {
  const { storeFrontProperty } = {};
  const { data } = UseHomepageservices(storeFrontProperty);
  const classes = ItemSliderStyles(data);
  const [sliderConfig, setSliderConfig] = useState({});
  let slidesToShow;
  if (isMobileOnly) {
    slidesToShow = data.perRowMobileView
      ? toNumber(data.perRowMobileView) + 0.2
      : 1.2;
  } else {
    slidesToShow = data && data.perRowWebView ? data.perRowWebView : 6;
  }
  let ImageHeight;
  if (isMobileOnly) {
    ImageHeight = data.imageHeightMobileView
      ? data.imageHeightMobileView + "px"
      : "150px";
  } else {
    ImageHeight = data.imageHeightWebView
      ? data.imageHeightWebView + "px"
      : "213px";
  }
  const settings = {
    dots: false,
    infinite: false,
    centerPadding: "10px",
    speed: 500,
    slidesToShow,
    className: classes.checkSliderLength,
    lazyLoad: true,
    slidesToScroll: 1,
    rows: data && data.showRows ? data.showRows : 1,
    arrows: false,
    initialSlide: 0,
    draggable: true,
  };
  const handleSliderConfig = (element) => {
    setSliderConfig(element);
  };
  const theme = useTheme();
  const history = useHistory();
  function next() {
    sliderConfig.slickNext();
  }
  function previous() {
    sliderConfig.slickPrev();
  }
  return (
    <Fragment>
      <Box
        py={
          data && data.listOfItems && Boolean(data.listOfItems.length) ? 1 : 0
        }
      >
        <SliderContentWrapper
          title={
            <Box>
              {data &&
              data.listOfItems &&
              Boolean(data.listOfItems.length) &&
              (data.listOfItems[0].image !== "" ||
                data.listOfItems[0].name !== "") ? (
                <Fragment>
                  {data.title ? (
                    <Typography variant="h2" component="h2">
                      {data.title}
                    </Typography>
                  ) : (
                    ""
                  )}
                  {data.subtitle ? (
                    <Typography variant="body1" component="h2">
                      {data.subtitle}
                    </Typography>
                  ) : (
                    ""
                  )}
                </Fragment>
              ) : (
                ""
              )}
            </Box>
          }
          showButton={
            !isMobileOnly &&
            data &&
            data.listOfItems &&
            data.listOfItems.length > data.perRowWebView * data.showRows
          }
          previous={previous}
          next={next}
        >
          <SliderWrapper
            settings={settings}
            handleSliderConfig={handleSliderConfig}
          >
            {data &&
              data.listOfItems &&
              data.listOfItems.map(
                (o, i) =>
                  data && (
                    <Box
                      onClick={() => {
                        history.push({
                          pathname: `${o.link}`,
                        });
                      }}
                      mb={2}
                      component={Paper}
                      elevation={0}
                      key={i}
                      css={{
                        cursor: "pointer",
                        boxShadow: `${theme.shadows[0]}`,
                        "&:hover": {
                          boxShadow: `${theme.shadows[1]}`,
                        },
                      }}
                    >
                      <Box key={i} className={classes.Links}>
                        <Fragment>
                          {!data.hideImage && (
                            <Box
                              m={
                                data.imageOuterPadding
                                  ? data.imageOuterPadding / 8
                                  : 1
                              }
                              height={ImageHeight}
                              css={{
                                "&:hover img": {
                                  transform: "scale(1.01)",
                                  transformOrigin: "50% 50%",
                                },
                              }}
                            >
                              <LazyLoadImage
                                width="100%"
                                height="100%"
                                effect="blur"
                                alt="Logo"
                                style={{
                                  transition: "transform .4s",
                                  objectFit: data.imageAlign
                                    ? data.imageAlign
                                    : "contain",
                                }}
                                src={o.image}
                              />
                            </Box>
                          )}
                          {!data.hideText && o.name && (
                            <Box
                              p={1}
                              mt={1}
                              pt={0}
                              textAlign={
                                data.textAlign ? data.textAlign : "left"
                              }
                            >
                              <Typography
                                variant="h3"
                                style={{
                                  fontSize: data.textSize + "px",
                                }}
                              >
                                {o.name}
                              </Typography>
                            </Box>
                          )}
                        </Fragment>
                      </Box>
                    </Box>
                  )
              )}
          </SliderWrapper>
        </SliderContentWrapper>
      </Box>
    </Fragment>
  );
};

export default memo(CustomImageLink);
