import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import React, { Fragment, useEffect, useState } from "react";
import SliderWrapper from "../../Homepage/SliderWrapper/SliderWrapper";
import uniqBy from "lodash/uniqBy";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Dialog, DialogContent } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import findIndex from "lodash/findIndex";
import UseHomepageservices from "../../../Services/UseHomepageservices";
const SingleProductSlider = ({ Assets }) => {
  const classes = useStyle();
  const { data } = UseHomepageservices("HEADER");
  const { placeholderImage } = data || {};
  const [selectedThumb, setSelectedThumb] = useState({});
  const [sliderConfig, setSliderConfig] = useState({});
  const [openLightBox, setOpenLightBox] = useState(false);
  const [selectedImage, setSelectedImage] = useState({});
  const handleClickOpen = (data) => {
    setSelectedImage(data);
    setOpenLightBox(true);
  };
  const handleClickSelect = (data) => {
    setSelectedThumb(data);
    setActive(!isActive);
  };
  const [isActive, setActive] = useState(false);
  const settingsThumb = {
    arrows: false,
    dotsClass: "slick-dots slick-thumb",
    infinite: Assets.length > 5,
    speed: 500,
    vertical: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    className: classes.pdpSliderThumb,
    centerPadding: "50px",

  };
  const handleSliderConfig = (element) => {
    setSliderConfig(element);
  };

  useEffect(() => {
    if (Assets) {
      if (Assets.length) {
        setSelectedThumb(Assets[0]);
      } else {
        setSelectedThumb({
          width: "placeholder",
          source: placeholderImage,
        });
      }
    }
  }, [Assets, placeholderImage]);
  function next() {
    sliderConfig.slickNext();
  }
  function previous() {
    sliderConfig.slickPrev();
  }
  return (
    <Fragment>
      <Box display="flex" width="100%">
        {Assets.length > 1 && (
          <Box width="15%" display="flex" flexDirection="column">
            <Box textAlign="center">
              <IconButton onClick={previous} size="small">
                <KeyboardArrowUpIcon />
              </IconButton>
            </Box>
            <SliderWrapper
              handleSliderConfig={handleSliderConfig}
              settings={settingsThumb}
            >
              {Assets.map((data, i) => (
                <Box
                  height="75px"
                  p={0.625}
                  key={i}
                  onClick={() => handleClickSelect(data)}
                >
                  <LazyLoadImage
                    alt={data.width}
                    src={data.source}
                    height="100%"
                    width="100%"
                    style={{
                      objectFit: "scale-down",
                      cursor: "pointer",
                      // border:
                      //   data.source === selectedThumb.source
                      //     ? "1px solid gray"
                      //     : "1px solid transparent",
                    }}
                  />
                </Box>
              ))}
            </SliderWrapper>
            <Box textAlign="center">
              <IconButton aria-label="delete" onClick={next} size="small">
                <KeyboardArrowDownIcon />
              </IconButton>
            </Box>
          </Box>
        )}
        <Box
          width="80%"
          height="400px"
          onClick={() => handleClickOpen(selectedThumb)}
        >
          <LazyLoadImage
            alt={selectedThumb.width}
            src={selectedThumb.source}
            height="100%"
            width="100%"
            style={{
              objectFit: "scale-down",
              cursor: "zoom-in",
            }}
          />
        </Box>
      </Box>
      <ViewImage
        openLightBox={openLightBox}
        setOpenLightBox={setOpenLightBox}
        source={selectedImage.source}
        Assets={Assets}
      />
    </Fragment>
  );
};

export default SingleProductSlider;
const useStyle = makeStyles((theme) => ({
  productZoomSlider: {
    "& .slick-slider": {
      justifyContent: "center",
      flexDirection: "column",
      display: "flex",
      height: "100%",
    },
    "& .slick-track": {
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      height: "100%",
    },
    "& .slick-slide div": {
      height: "100%",
    },
    "& img": {
      objectFit: "contain",
    },
  },
  pdpSliderThumb: {
    "& .slick-list": {
      height: "345px !important",
    },
    // marginBottom: "-48px",
    // marginTop: "20px",
    // padding: "0 26px",
    "& .slick-prev": {
      left: 0,
    },
    "& .slick-next": {
      right: 0,
    },
    "& .slick-prev:before, .slick-next:before": {
      color: "rgb(204, 204, 204)",
      
    },
    "& .thumb-active": {
      border: "1px solid gray",
      padding: theme.spacing(0.325),
    },
  },
}));

const ViewImage = ({ openLightBox, setOpenLightBox, source = "", Assets }) => {
  const classes = useStyle();
  const handleClose = () => {
    setOpenLightBox(false);
  };

  const [slickCurrentIndex, setSlickCurrentIndex] = useState(null);
  useEffect(() => {
    setSlickCurrentIndex(
      findIndex(Assets, (o) => {
        return o.source === source;
      })
    );
  }, [source, Assets]);

  function NextArrow(props) {
    console.log(props);
    const { className, style, onClick } = props;
    return (
      <Box
        className={className}
        style={{
          ...style,
          display: "block",
          color: "rgb(204, 204, 204)  !important",
          right: 0,
          zIndex: 1,
        }}
        css={{
          "&:before": {
            color: "rgb(204, 204, 204) !important",
            fontSize: "40px",
          },
        }}
        onClick={onClick}
      />
    );
  }

  function PrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <Box
        className={className}
        style={{
          ...style,
          display: "block",
          color: "rgb(204, 204, 204) !important",
          left: "-20px",
          zIndex: 1,
        }}
        css={{
          "&:before": {
            color: "rgb(204, 204, 204) !important",
            fontSize: "40px",
          },
        }}
        onClick={onClick}
      />
    );
  }

  const settingsZoom = {
    enabled: true,
    infinite: false,
    draggable: true,
    accessibility: true,
    focusOnSelect: true,
    focusOnChange: true,
    autoplay: false,
    touchMove: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    slickRemove: true,
    initialSlide: slickCurrentIndex,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  const radioGroupRef = React.useRef([]);
  radioGroupRef.current = [];
  const addToRef = (el, index) => {
    if (el && !radioGroupRef.current.includes(el)) {
      if (slickCurrentIndex === index) {
        radioGroupRef.current.push(el);
        radioGroupRef.current[0].focus();
      }
    }
  };

  return (
    <Dialog fullScreen open={openLightBox} onClose={handleClose}>
      <DialogContent
        id="productZoomSlider"
        className={classes.productZoomSlider}
      >
        <Box
          position="absolute"
          right="0"
          marginRight="32px"
          marginTop="0px"
          zIndex="1"
        >
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <Close />
          </IconButton>
        </Box>
        <Fragment>
          <SliderWrapper settings={settingsZoom}>
            {uniqBy(Assets, "source").map((data, i) => (
              <Box key={i} id={`sliderBox_${i}`} ref={(el) => addToRef(el, i)}>
                <LazyLoadImage
                  alt={data.width}
                  src={data.source}
                  height="100%"
                  width="100%"
                  style={{
                    objectFit: "scale-down",
                  }}
                />
              </Box>
            ))}
          </SliderWrapper>
        </Fragment>
      </DialogContent>
    </Dialog>
  );
};
