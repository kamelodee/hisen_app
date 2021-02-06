import React, { memo } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SliderWrapper = ({ children, settings, handleSliderConfig }) => {
  const setTextInputRef = (element) => {
    handleSliderConfig && handleSliderConfig(element);
  };
  return (
    <Slider ref={handleSliderConfig && setTextInputRef} {...settings}>
      {children}
    </Slider>
  );
};

export default memo(SliderWrapper);
