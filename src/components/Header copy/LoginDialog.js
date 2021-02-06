import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Close from "@material-ui/icons/Close";
import React, { Fragment, useState, lazy, Suspense, memo } from "react";
import { isMobile } from "react-device-detect";
import { mutate } from "swr";
import AxiosConfigure, { PrivateBaseUrl } from "../../Axios.configure";
import LoginImage from "../../Images/Login.image";
import { Skeleton } from "@material-ui/lab";
import axios from "axios";
const MobileNumberInput = lazy(() => import("../MobileNumberInput"));
const LoginDialog = ({ openDialog, setopenDialog }) => {
  const [mobileNumber, setmobileNumber] = useState();
  const [mobileOtp, setmobileOtp] = useState("");
  const [ShowMobileNumber, setShowMobileNumber] = useState(true);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState("");
  const [otperror, setotperror] = useState("");
  const HandleMobileOtp = (ev) => {
    setmobileOtp(ev.target.value);
  };
  const handleCloseDialog = () => {
    setopenDialog(false);
    setShowMobileNumber(true);
    setmobileNumber("");
    setmobileOtp("");
  };

  async function onSumbit() {
    try {
      setloading(true);
      if (!Boolean(error)) {
        if (!mobileNumber) {
          seterror("Enter the mobile Number");
          return;
        } else {
          seterror("");
        }
        const json = {
          mobileNumber: mobileNumber.nationalNumber,
          countryCode: parseInt(mobileNumber.countryCallingCode),
          countryCodeIso: mobileNumber.country,
        };
        console.log(PrivateBaseUrl);
        if (ShowMobileNumber) {
          let url;
          if (process.env.NODE_ENV === "development") {
            url = PrivateBaseUrl + "auth/login-with-otp";
          } else {
            url = PrivateBaseUrl + "/auth/login-with-otp-Kaleyra";
          }
          await axios({
            url,
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            data: JSON.stringify(json),
          });

          if (otperror) {
            setotperror("");
          }
          setShowMobileNumber(false);
        } else {
          if (mobileOtp) {
            if (mobileOtp.length > 4) {
              json.otp = mobileOtp;
              const res = await axios({
                url: PrivateBaseUrl + "/auth/validate-otp-new",
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                data: JSON.stringify(json),
              });
              const data = res.data;
              localStorage.setItem("access token", data.accessToken);
              const cartdata = await AxiosConfigure.cartLocal();
              if (cartdata.length) {
                const axios = await AxiosConfigure.PrivateConfigiration();
                const userdetails = AxiosConfigure.getDecodedAccessToken();
                await axios({
                  url: `carts/addMultipleProducts?userId=${userdetails.sub}`,
                  method: "post",
                  data: cartdata,
                });
                localStorage.setItem("cart_data", JSON.stringify([]));
              }
              setShowMobileNumber(true);
              mutate("auth", true);
              handleCloseDialog();
            }
          }
        }
      }
    } catch (error) {
      if (ShowMobileNumber) {
        seterror("Invalid Mobile Number");
      } else {
        setotperror("Invalid otp");
      }
    } finally {
      setloading(false);
    }
  }

  return (
    <Fragment>
      <Dialog
        fullScreen={isMobile}
        maxWidth="lg"
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="form-dialog-title"
      >
        {isMobile && (
          <Fragment>
            <AppBar elevation={0}>
              <Toolbar>
                <Box flexGrow={1} />
                <IconButton
                  edge="start"
                  color="inherit"
                  onClick={handleCloseDialog}
                  aria-label="close"
                >
                  <Close />
                </IconButton>
              </Toolbar>
            </AppBar>
            <Toolbar />
          </Fragment>
        )}
        <DialogContent style={{ padding: 0 }}>
          <Box
            maxWidth="720px"
            minHeight="400px"
            maxHeight="90vh"
            display="flex"
            flexDirection={isMobile ? "column" : "row"}
          >
            <Box
              bgcolor="primary.main"
              display="flex"
              width={!isMobile ? "45%" : "100%"}
              flexDirection="column"
              p={isMobile ? 4 : "66px 35px 16px"}
              color="background.paper"
            >
              <Typography variant="h3" color="inherit" component="p" paragraph>
                Login with your mobile number to get started
              </Typography>

              <Box flexGrow={1} />
              <Box>
                <LoginImage />
              </Box>
            </Box>
            <Box width={!isMobile ? "55%" : "100%"} p="56px 35px 16px">
              <Box mb={4}>
                <Suspense fallback={<Skeleton height="39px" />}>
                  <MobileNumberInput
                    value={mobileNumber}
                    setShowMobileNumber={setShowMobileNumber}
                    setmobileOtp={setmobileOtp}
                    onChange={setmobileNumber}
                    error={error}
                    seterror={seterror}
                  />
                </Suspense>

                {!ShowMobileNumber && (
                  <TextField
                    value={mobileOtp}
                    autoFocus
                    error={otperror}
                    helperText={otperror}
                    onChange={HandleMobileOtp}
                    label="One time password"
                    required
                    fullWidth
                    variant="standard"
                  />
                )}
              </Box>
              <Box position="relative">
                <Button
                  fullWidth
                  variant="contained"
                  disabled={loading}
                  size="large"
                  onClick={onSumbit}
                  color="secondary"
                >
                  {ShowMobileNumber ? "Request otp " : "Login"}
                </Button>
                {!ShowMobileNumber && (
                  <Button
                    style={{
                      float: "right",
                      marginTop: 12,
                      marginBottom: 12,
                    }}
                    size="small"
                    color="primary"
                  >
                    resend otp
                  </Button>
                )}
                {loading && (
                  <CircularProgress
                    size={24}
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      marginTop: -12,
                      marginLeft: -12,
                    }}
                  />
                )}
              </Box>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default memo(LoginDialog);
