import React, { Fragment, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import includes from "lodash/includes";
import { Box, Grid, Typography, Fab } from "@material-ui/core";
import KeyboardArrowUp from "@material-ui/icons/KeyboardArrowUp";
const Footer = () => {
  const { data } = {data:{
    backToTop:200,
    footerBgColor:"#fff",
    showFooter:true,
    showPages:true,
    titleTextColor:"#fff",
    copyRight:{
      title:"2021",
      CRbgColor:"#fff",
      textColor:"#fff"
    },
    listOfItems:[
      {footerBgColor:"#fff"}
    ]
  }
  
  };
  const classes = useStyles();
  const history = useHistory();
  const { pathname } = history.location;
  const [pageScroll, setPageScroll] = useState(null);
  useEffect(() => {
    if (document.getElementById("App")) {
      document.getElementById("App").addEventListener("scroll", handleScroll);
    }

    return () => {
      if (document.getElementById("App")) {
        document.getElementById("App").addEventListener("scroll", handleScroll);
      }
    };
  }, [pageScroll]);
  async function handleScroll() {
    let scrollTop = document.getElementById("App").scrollTop;
    setPageScroll(scrollTop);
  }
  let browsePagesList = ["p", "pd", "checkout"];
  let exactUrl = pathname.split("/");
  let ShowFooter;
  if (data) {
    if (data.showFooter) {
      if (pathname === "/") ShowFooter = true;
      if (data.showPages === "browse" && includes(browsePagesList, exactUrl[1]))
        ShowFooter = true;
    }
  }
  return (
    <Fragment>
      {ShowFooter && (
        <Fragment>
          <Box
            bgcolor={
              data && data.footerBgColor ? data.footerBgColor : "#1f1f1f"
            }
            color={
              data && data.titleTextColor ? data.titleTextColor : "#ffffff"
            }
            width="100%"
          >
            <Grid
              container
              direction="column"
              justify="space-between"
              className={classes.footerColumns}
            >
             



                <Grid
                  
                  item
                  container
                  direction="row"
                  xs={12}
                  className={classes.footerGrid}
                  
                >
                  
                    <Box
                    
                      mb={2}
                     
                      pr={2}
                    >
                      
                        <Typography
                          variant="h3"
                          className={classes.footerColTitle}
                        >
                        About
                        </Typography>
                    
                      <Box
                        dangerouslySetInnerHTML={{
                          __html: "",
                        }}
                      ></Box>
                    </Box>
                  
                </Grid>
            
            </Grid>
          </Box>
          <Box
            bgcolor={
              data.copyRight && data.copyRight.CRbgColor
                ? data.copyRight.CRbgColor
                : "#101010"
            }
            color={data.copyRight ? data.copyRight.textColor : "#ffffff"}
            display="flex"
            p={2}
          >
            <Box flexGrow="0.97">
              <Typography color="inherit">{data.copyRight.title}</Typography>
            </Box>
            <Box display="flex" alignItems="center">
              <Typography style={{ marginRight: 8 }} color="inherit">
                Crafted by
              </Typography>
              <a
                href="https://apptino.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{ height: "20px" }}
              >
                <img
                  width="72px"
                  src="/images/growmax-logo.svg"
                  alt="apptino"
                />
              </a>
            </Box>
          </Box>
        </Fragment>
      )}
      {data && data.backToTop && pageScroll > 200 && (
        <Fab
          onClick={() => {
            document
              .querySelector("#App")
              .scrollTo({ top: 0, behavior: "smooth" });
          }}
          aria-label={"backtotop"}
          className={classes.backToTop}
        >
          <KeyboardArrowUp />
        </Fab>
      )}
    </Fragment>
  );
};

export default Footer;

const useStyles = makeStyles((theme) => ({
  footerColTitle: {
    marginBottom: theme.spacing(1.5),
    lineHeight: "30px",
  },
  footerColumns: {
    marginTop: theme.spacing(1),
    "& a": {
      textDecoration: "none",
    },
    "& .MuiBox-root": {
      fontSize: ".875rem",
    },
    "& p": {
      margin: 0,
      marginBottom: "0.35em",
    },
    "& pre": {
      whiteSpace: "pre-wrap",
    },
  },
  // footerGrid:{
  //   marginBottom: theme.spacing(2)
  // },
  backToTop: {
    position: "fixed",
    right: theme.spacing(2.325),
    bottom: theme.spacing(6),
  },
}));
