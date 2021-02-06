import React, {
  Fragment,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import UseHomepageservices from "../../../Services/UseHomepageservices";
import remove from "lodash/remove";
import BannerSliderStyles from "./BannerSlider.css";
import SliderWrapper from "../SliderWrapper/SliderWrapper";
import Box from "@material-ui/core/Box";
import map from "lodash/map";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { isMobileOnly } from "react-device-detect";
import sliderData from "./SliderData"
const BannerSliderComponents = () => {
  const classes = BannerSliderStyles();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const SliderData = sliderData
 
  let sliderHeight = "";
  if (isMobileOnly) {
    sliderHeight =
      SliderData.data && SliderData.data.sliderHeightMobile
        ? SliderData.data.sliderHeightMobile + "px"
        : "250px";
  } else {
    sliderHeight =
      SliderData.sliderHeightWeb?.value > 1
        ? windowWidth / SliderData.sliderHeightWeb.value
        : window.innerHeight - 64;
  }

  
  const Resizecallback = useCallback((e) => {
    const myWidth = window.innerWidth;
    setWindowWidth(myWidth);
  }, []);
  useEffect(() => {
    window.addEventListener("resize", Resizecallback);
    return () => window.removeEventListener("resize", Resizecallback);
  }, [Resizecallback]);
  const settings = {
    enabled: true,
    infinite: true,
    autoplay: true,
    dots: true,
    pauseOnFocus: false,
    autoplaySpeed: 3500,
    touchMove: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    pauseOnHover: true,
    dotsClass: `slick-dots ${classes.slickThumb}`,
    draggable: false,
    lazyLoad: true,
    appendDots: (dots) => {
      return (
        <Box bottom="-3px !important">
          <Box component="ul" margin="1px !important">
            {dots}
          </Box>
        </Box>
      );
    },
    customPaging: () => {
      return <div className="pagination-dots"></div>;
    },
  };
  return (
    <Fragment>
      <SliderWrapper settings={settings}>
        {useMemo(() => {
          return map(SliderData.listOfItems, (data, i) => (
            <Box
              key={i}
              position="relative"
              mb={1}
    //*              component="div"
              height={sliderHeight}
              width="100%"
              css={{
                backgroundImage: "https://hisense2-myapptino-assets.s3.eu-west-2.amazonaws.com/app_assets/company_images/1/homepage/Sliders_1200x400b_1603253846203.jpg",
                
                backgroundRepeat: "no-repeat!important",
                backgroundPosition: "50%!important",
                backgroundSize: "cover!important",
                position: "relative",
              }}
            >
              {data.sliderLink && !data.showText && (
                <Box
                  position="absolute"
                  width="100%"
                  height="100%"
                  component="a"
                  target={"_blank"}
                  href={data.sliderLink}
                />
              )}
              {data.showText && (
                <Box
                  position="absolute"
                  bgcolor={data.background}
                  textAlign="left"
                  padding="15px"
                  width="463.27px"
                  maxWidth="560px"
                  height="53%"
                  top="20%"
                  alignItems="center"
                  justifyContent="center"
                  display="flex"
                  flexDirection="column"
                  right={
                    data.alignText
                      ? data.alignText.value === "Right"
                        ? "12px"
                        : data.alignText.value === "Center"
                        ? "0"
                        : "unset"
                      : "unset"
                  }
                  left={
                    data.alignText
                      ? data.alignText.value === "Left"
                        ? "12px"
                        : data.alignText.value === "Center"
                        ? "0"
                        : "unset"
                      : "unset"
                  }
                  margin={
                    data.alignText
                      ? data.alignText.value
                        ? "0 auto"
                        : "inherit"
                      : "inherit"
                  }
                >
                  <Box color={data.headlineColor}>
                    <Typography
                      variant="h1"
                      gutterBottom
                      className={classes.homePageFontH1}
                    >
                      {data.headline}
                    </Typography>
                  </Box>
                  <Box color={data.descriptionColor}>
                    <Typography
                      variant="body1"
                      gutterBottom
                      className={classes.sliderDescription}
                    >
                      {data.description}
                    </Typography>
                  </Box>
                  {data.showActionButton ? (
                    <Link
                      component="a"
                      target="_blank"
                      href={data.sliderLink}
                      underline="none"
                      className={classes.SliderTextButton}
                    >
                      {data.buttonLabel}
                    </Link>
                  ) : (
                    ""
                  )}
                </Box>
              )}
            </Box>
          ));
        }, [SliderData, windowWidth, classes])}
      </SliderWrapper>
    </Fragment>
  );
};

export default memo(BannerSliderComponents);
