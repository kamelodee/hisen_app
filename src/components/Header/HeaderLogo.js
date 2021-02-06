import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Link } from "react-router-dom";
import Utils from "../../Utils";
const HeaderLogo = ({ HeaderData }) => {
  return (
    <Link to="/">
      <LazyLoadImage
        width="100%"
        height="100%"
        style={{
          objectFit: "contain",
        }}
        effect="blur"
        alt="Logo"
        src="https://hisense2-myapptino-assets.s3.eu-west-2.amazonaws.com/app_assets/company_images/1/header/dark_logo/Hisense_Color_Transparent_Digital-1170x360_a_1603253581888.png"
      />
    </Link>
  );
};

export default HeaderLogo;
