import React, { Fragment } from "react";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import makeStyles from "@material-ui/core/styles/makeStyles";

import { isMobile } from "react-device-detect";
import { ArrowForwardIos, ArrowBackIos } from "@material-ui/icons";

const UseStyles = makeStyles((theme) => ({
  prevNextbuttons: {
    "&:hover": {
      color: theme.palette.primary.light,
    },
  },
}));
const SliderContentWrapper = ({
  title,
  showButton,
  previous,
  next,
  children,
}) => {
  const classes = UseStyles();
  return (
    <Fragment>
      <Box display="flex" alignItems="center" mb={0.5} px={isMobile ? 1 : 2}>
        <Box flexGrow="1">{title}</Box>
        {showButton && (
          <Fragment>
            <IconButton className={classes.prevNextbuttons} onClick={previous}>
              <ArrowBackIos fontSize="small" onClick={previous} />
            </IconButton>
            <IconButton className={classes.prevNextbuttons} onClick={next}>
              <ArrowForwardIos onClick={next} fontSize="small" />
            </IconButton>
          </Fragment>
        )}
      </Box>
      {children}
    </Fragment>
  );
};

export default SliderContentWrapper;
