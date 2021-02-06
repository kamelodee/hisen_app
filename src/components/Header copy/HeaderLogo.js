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
        src={Utils.getLogo(HeaderData)}
      />
    </Link>
  );
};

export default HeaderLogo;
