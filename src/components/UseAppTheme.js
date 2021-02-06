import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import responsiveFontSizes from "@material-ui/core/styles/responsiveFontSizes";
import createBreakpoints from "@material-ui/core/styles/createBreakpoints";
const htmlFontSize = 16;
const fontSize = 13;
const UseAppTheme = (data) => {
  const breakpoints = createBreakpoints({});
  const GlobalThemeConfig = createMuiTheme({
    palette: {
      border: "#e0e0e0",
    },
    spacing: (value) => value * 8,
    props: {
      MuiTextField: {
        variant: "outlined",
        margin: "dense",
      },
      MuiButton: {
        size: "large",
      },
      IconButton:{
        fontSize:"large",
      }
    },
    overrides: {
      MuiListItemIcon: {
        root: {
          minWidth: 36,
        },
      },
      MuiPaper:{
        rounded:{
          borderRadius: "8px"
        }
      },
      MuiTab:{
        wrapper:{
          fontSize:20,
          textTransform: "capitalize"
        }
      },
      MuiDialogTitle: {
        root: {
          "& .MuiTypography-h6": {
            fontSize: 16,
          },
        },
      },
    },
  });
  if (data.primaryColor) {
    GlobalThemeConfig.palette.primary = { main: data.primaryColor };
  }
  if (data.backgroundColor) {
    GlobalThemeConfig.palette.background = {
      default: data.backgroundColor,
    };
  }
  if (data.secondaryColor) {
    GlobalThemeConfig.palette.secondary = { main: data.secondaryColor };
  }
  GlobalThemeConfig.typography = {
    htmlFontSize: htmlFontSize,
    fontSize: fontSize,
    fontFamily: `"Inter", "Helvetica", "Arial", sans-serif`,
    h1: {
      fontSize: GlobalThemeConfig.typography.pxToRem(26),
      fontWeight: 500,
      textTransform: "capitalize",
      "line-height": GlobalThemeConfig.typography.pxToRem(36),
    },
    h2: {
      fontSize: GlobalThemeConfig.typography.pxToRem(22),
      fontWeight: 600,
      textTransform: "capitalize",
    },
    h3: {
      fontSize: GlobalThemeConfig.typography.pxToRem(18),
      fontWeight: 500,
      textTransform: "capitalize",
      // [breakpoints.up("md")]: {
      //   fontWeight: 500,
      // }
    },
    h4: {
      fontSize: GlobalThemeConfig.typography.pxToRem(16),
      fontWeight: 500,
      textTransform: "capitalize",
    },
    h5: {
      fontSize: GlobalThemeConfig.typography.pxToRem(14),
      fontWeight: 500,
      textTransform: "capitalize",
    },
    h6: {
      fontSize: GlobalThemeConfig.typography.pxToRem(13),
      fontWeight: 600,
    },
    subtitle: {
      lineHeight: 1.4,
    },
    subtitle2: {
      color: "rgba(0,0,0,.6)",
    },
    body1: {
      fontSize: GlobalThemeConfig.typography.pxToRem(14),
      [breakpoints.up("md")]: {
        fontSize: GlobalThemeConfig.typography.pxToRem(14),
      },
    },
    caption: {
      fontSize: GlobalThemeConfig.typography.pxToRem(13),
      color: "rgba(0,0,0,.6)",
    },
  };
  GlobalThemeConfig.shadows.splice(1, 1, "0px 3px 6px rgba(0,0,0,0.1)");
  GlobalThemeConfig.shadows.splice(2, 1, "1px 1px 14px rgba(0,0,0,0.1)");
  return responsiveFontSizes(createMuiTheme(GlobalThemeConfig));
};

export default UseAppTheme;
