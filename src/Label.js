import React, { memo } from "react";
import clsx from "clsx";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import useTheme from "@material-ui/core/styles/useTheme";
import { lighten } from "@material-ui/core/styles/colorManipulator";

import { grey } from "@material-ui/core/colors";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 0,
    flexShrink: 0,
    borderRadius: theme.shape.borderRadius,
    lineHeight: "10px",
    //boxShadow: theme.shadows[2],
    fontSize: "10px",
    height: 20,
    minWidth: 20,
    whiteSpace: "nowrap",
    padding: theme.spacing(0.5, 1),
  },
  rounded: {
    borderRadius: 10,
    padding: theme.spacing(0.5),
  },
}));

const Label = ({
  className,
  variant,
  color,
  shape,
  children,
  style,
  ...rest
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const rootClassName = clsx(
    {
      [classes.root]: true,
      [classes.rounded]: shape === "rounded",
    },
    className
  );

  const finalStyle = { ...style };

  if (variant === "contained") {
    finalStyle.backgroundColor =
      color === "primary"
        ? lighten(theme.palette.primary.main, 0.75)
        : lighten(color, 0.75);
    finalStyle.color = color === "primary" ? theme.palette.primary.main : color;
    finalStyle.fontWeight = 600;
  } else {
    finalStyle.border =
      color === "primary"
        ? `1px solid ${theme.palette.primary.main}`
        : `1px solid ${color}`;
    finalStyle.color = color === "primary" ? theme.palette.primary.main : color;
  }

  return (
    <Typography
      {...rest}
      className={rootClassName}
      style={finalStyle}
      variant="body1"
    >
      {children}
    </Typography>
  );
};

Label.defaultProps = {
  style: {},
  color: grey[600],
  variant: "contained",
  shape: "square",
};

export default Label;
