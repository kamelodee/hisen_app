import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: "",
  },
  cartLeftSection:{
    height: "100%",
    padding: theme.spacing(2)
  },
  cartRightSection:{
    position: "sticky",
    top: "64px",
    right: 0,
    width: "100%",
    height: "calc(100% - 64px)",
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingRight: theme.spacing(3)
  },
  sflCard: {
    padding: theme.spacing(1),
    [theme.breakpoints.between("lg", "1600")]: {
      maxWidth: "20%",
      flexBasis: "20%",
    },
  },
  primaryLink:{
    color: theme.palette.primary.main
  }
}))

export default useStyles
