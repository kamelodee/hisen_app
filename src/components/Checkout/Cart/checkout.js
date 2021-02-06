import React, { Fragment, useEffect, useState } from "react";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import FormControl from "@material-ui/core/FormControl";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import StepButton from "@material-ui/core/StepButton";
import Collapse from "@material-ui/core/Collapse";
import Link from "@material-ui/core/Link";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import { isMobile } from "react-device-detect";
import { useParams } from "react-router-dom";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Done from "@material-ui/icons/Done";
import HomeOutlined from "@material-ui/icons/HomeOutlined";
import Payment from "@material-ui/icons/Payment";
import CartPriceDetails from "./componentd/CartPriceDetails/CartPriceDetails";
import UseCheckoutservices from "../../../Services/CheckoutPageServices";
import Elasticsearch from "../../../Services/ElasticSearch";
import { cartCalculation } from "../checkoutUtils/cart.utils";
import map from "lodash/map";
import find from "lodash/find";
import Utils from "../../../Utils";
import UseHomepageservices from "../../../Services/UseHomepageservices";

import UseAddressServices from "../../../Services/AddressService";
import { requestBody } from "./order-summary.util";
import CreateAddress from "./componentd/CreateAddress/CreateAddress";
import UseAuth from "../../../Services/UseAuth";
import UseFetchUser from "../../../Services/UseFetchuserdetails";
import Ordersuccess from "./componentd/OrderSuccess";
import LoginDialog from "../../../components/Header/LoginDialog";
import useSWR, { mutate } from "swr";
import AxiosConfigure from "../../../Axios.configure";
import { format, addDays } from "date-fns";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
    },
    active: {
        color: "primary",
    },
    backButton: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    cardTitle: {
        fontWeight: 400,
        fontSize: "24px",
        marginTop: "16px",
        marginBottom: "8px",
    },
    stepperForm: {
        background: "transparent",
        padding: 0,
        "& .MuiStepButton-root": {
            padding: 0,
            margin: 0,
        },
    },
    image: {
        width: 75,
        height: 75,
        backgroundColor: "#0000000d",
        marginRight: theme.spacing(1),
        padding: 5,
    },
    img: {
        margin: "auto",
        display: "block",
        maxWidth: "100%",
        maxHeight: "100%",
    },
    addressListItem: {
        borderBottom: `1px solid ${theme.palette.divider}`,
        margin: "0 !important",
        padding: "10px 0",
        "&:last-child": {
            borderBottom: 0,
        },
    },
}));

function getSteps() {
    return ["Login", "Address", "Payment"];
}
const fetcher = (...args) => fetch(...args).then((res) => res.json());
const Checkout = () => {
    const { isbuynow } = useParams();
    const { data: isLoggedIn } = UseAuth();
    const { data: userdetails } = UseFetchUser(isLoggedIn);
    const [openDialog, setopenDialog] = useState(false);
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();
    const { data: cart, mutate: cartMutate } = {}
    const [cartData, setCartData] = useState([]);
    const [CartValue, setCartValue] = useState([]);
    const [cartLoading, setcartLoading] = useState(true);
    const { data: sellerDatares } = useSWR(
        `${process.env.REACT_APP_PublicAccess_url}getSellerCurrency`,
        fetcher,
        {
            revalidateOnFocus: false,
        }
    );
    useEffect(() => {
        if (cart.length > 0) {
            async function fetchCartData() {
                const cartData = await Elasticsearch.getProductsByProductsId(
                    map(cart, "productId")
                );
                const cartResult = Elasticsearch.FormatResults(cartData);
                const total = cartCalculation(cartResult, cart);
                setCartValue(total.cartValue);
                setCartData(total.cartData);
                setcartLoading(false);
            }
            fetchCartData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cart]);
    const { data: address, mutate: addressMutate } = UseAddressServices(
        `addresses/readAddressByUserId/`
    );
    useEffect(() => {
        if (isLoggedIn) {
            async function fetchUserAddress() {
                if (address[0]) {
                    setselectedAddressId(address[0].id.toString());
                    setselectedAddress(address[0]);
                }
            }
            fetchUserAddress();
        } else {
            setActiveStep(0);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoggedIn, address]);
    const { alldata,placeholderImage } = {};
    
    const [orderData, setOrderData] = useState();
    async function placeOrder() {
        const orderBody = requestBody(1, selectedAddress, CartValue, cartData);
        orderBody.buyerCurrencyId = sellerDatares.id;
        orderBody.buyerCurrencyCode = sellerDatares.currencyCode;
        const axios = await AxiosConfigure.PrivateConfigiration();
        const orderdata = await axios.post(
            `orders/createOrderByBuyer?userId=${userdetails.id}&companyId=${1}`,
            orderBody
        );
        orderdata.data.data.orderedDate = orderBody.versionCreatedTimestamp;
        setOrderData(orderdata.data.data);
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        if (isbuynow === "iscart") {
            await axios.delete(
                `carts?userId=${userdetails.id}&find=ByUserId`
            );
            cartMutate(() => ({ data: [] }));
        }
    }
    const handleNext = () => {
        setNewLogin(false);
        if (isLastStep()) {
            placeOrder();
            // history.push({ pathname: "/orders/order-landing" });
        } else {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
    };
    const isLastStep = () => {
        return activeStep === totalSteps() - 1;
    };
    const totalSteps = () => {
        return steps.length;
    };
    const nextStep = () => {
        if (activeStep === 0 && isLoggedIn) {
            return true;
        }
        if (activeStep >= 1 && isLoggedIn && selectedAddressId) {
            return true;
        } else {
            return false;
        }
    };
    // const handleBack = () => {
    //     setActiveStep((prevActiveStep) => prevActiveStep - 1);
    // };

    // const handleReset = () => {
    //     setActiveStep(0);
    // };
    const [openAddAddress, setOpenAddAddress] = React.useState(false);
    const handleClickOpenAddAddress = () => {
        setOpenAddAddress(true);
    };
    const handleCloseAddAddress = () => {
        setOpenAddAddress(false);
    };
    const [newLogin, setNewLogin] = useState(false);
    const handleLogoutLogin = () => {
        localStorage.removeItem("access token");
        mutate("auth", false);
        setopenDialog(true);
    };
    const Login = (
        <Fragment>
            <Box alignItems="center" mt={2} mb={1}>
                <Typography variant="h4">Account</Typography>
            </Box>
            <Card>
                <CardContent>
                    {!isLoggedIn && (
                        <Box width={isMobile ? "100%" : "300px"}>
                            <Typography variant="subtitle1" gutterBottom>
                                To continue login with your mobile
              </Typography>
                            <Button
                                color="primary"
                                variant="contained"
                                onClick={() => {
                                    setopenDialog(true);
                                }}
                            >
                                Login
              </Button>
                        </Box>
                    )}
                    {isLoggedIn && userdetails && !newLogin && (
                        <Box alignItems="center" display="flex">
                            <Box width={isMobile ? "100%" : "300px"} flexGrow={1}>
                                <Box display="flex" mb={1} alignItems="center">
                                    <Typography>Logged in</Typography>
                                    <Box component="span" mr={1} />
                                    <Done color="primary" />
                                </Box>
                                <Box display="flex" mb={1} alignItems="flex-end">
                                    <Typography variant="h4">
                                        {userdetails.displayName}
                                    </Typography>
                                    <Box component="span" mr={1} />
                                    <Typography variant="body2">
                                        {userdetails.mobileNumber}
                                    </Typography>
                                </Box>
                            </Box>
                            <Box>
                                <Button
                                    color="primary"
                                    variant="text"
                                    onClick={() => {
                                        setActiveStep(0);
                                        setNewLogin(true);
                                    }}
                                >
                                    Change
                </Button>
                            </Box>
                        </Box>
                    )}
                    {newLogin && userdetails && (
                        <Box width={isMobile ? "100%" : "300px"} flexGrow={1}>
                            <Box display="flex" mb={1} alignItems="center">
                                <Typography>Logged in</Typography>
                                <Box component="span" mr={1} />
                                <Done color="primary" />
                            </Box>
                            <Box
                                display="flex"
                                mb={1}
                                alignItems="flex-start"
                                flexDirection="column"
                            >
                                <Typography>Name: {userdetails.displayName}</Typography>
                                <Box component="span" mb={1} />
                                <Typography>Mobile: {userdetails.mobileNumber}</Typography>
                                <Button
                                    variant="text"
                                    color="primary"
                                    onClick={handleLogoutLogin}
                                    style={{ textTransform: "none" }}
                                >{`Logout & Login to another account`}</Button>
                            </Box>
                        </Box>
                    )}
                </CardContent>
            </Card>
        </Fragment>
    );

    const [selectedAddressId, setselectedAddressId] = useState();
    const [selectedAddress, setselectedAddress] = useState({});
    const addressRadio = address.map((address) => (
        <FormControlLabel
            className={classes.addressListItem}
            key={address.id}
            value={address.id.toString()}
            control={<Radio />}
            label={
                <Box>
                    {address.mobileNo || address.primaryContact ? (
                        <Box display="flex">
                            {address.primaryContact && (
                                <Typography gutterBottom>
                                    <b>{address.primaryContact}</b>
                                </Typography>
                            )}
                        </Box>
                    ) : null}
                    <Typography gutterBottom title={address.addressLine}>
                        {address.addressLine}
                        {address.addressLine && address.addressLine.slice(-1) === ","
                            ? " "
                            : ", "}
                        {address.locality}
                        {address.locality && address.locality.slice(-1) === ","
                            ? " "
                            : ", "}
                    </Typography>
                    <Typography gutterBottom>
                        {address.city}
                        {address.city && address.city.slice(-1) === "," ? " " : ", "}
                        {address.district}
                        {address.district && "- "}
                        {address.pinCodeId}
                        {address.pinCodeId && address.pinCodeId.slice(-1) === ","
                            ? " "
                            : ", "}
                        {address.state}
                        {address.state && address.state.slice(-1) === "," ? " " : ", "}
                        {address.country}
                        {address.country && "."}
                    </Typography>
                    {address.mobileNo && (
                        <Typography gutterBottom>
                            <b>Phone: </b>
                            {address.mobileNo}
                        </Typography>
                    )}
                </Box>
            }
        />
    ));
    const handleChangeD = (event) => {
        setselectedAddressId(event.target.value);
        setselectedAddress(find(address, ["id", parseInt(event.target.value)]));
    };
    const selectAddress = (
        <Fragment>
            {Login}
            <Box
                display="flex"
                justifyContent="space-between"
                mt={1}
                mb={0.1}
                alignItems="center"
            >
                {address.length > 0 && (
                    <Typography variant="h4">Select Delivery Address</Typography>
                )}
                {address.length > 0 && (
                    <Button
                        color="primary"
                        variant="text"
                        onClick={handleClickOpenAddAddress}
                    >
                        Add address
                    </Button>
                )}
            </Box>
            <Card>
                <CardContent>
                    {address.length === 0 && (
                        <Typography variant="body1">
                            Add delivery address to proceed
                        </Typography>
                    )}
                    <Box mb={1} />
                    {address.length === 0 && (
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={handleClickOpenAddAddress}
                        >
                            Add address
                        </Button>
                    )}
                    <FormControl component="fieldset">
                        <RadioGroup
                            className={classes.addressDataGroup}
                            value={selectedAddressId}
                            aria-label="address"
                            name="address-select"
                            onChange={handleChangeD}
                        >
                            {addressRadio}
                        </RadioGroup>
                    </FormControl>
                </CardContent>
            </Card>
        </Fragment>
    );

    const paymentOption = (
        <Fragment>
            <Box alignItems="center" mt={2} mb={1}>
                <Typography variant="h4">Choose Payment Mode</Typography>
            </Box>
            <Card>
                <CardContent>
                    <FormControl component="fieldset">
                        <RadioGroup
                            className={classes.addressDataGroup}
                            value={"POD (Pay on delivery)"}
                            aria-label="payment"
                            name="payment-select"
                            onChange={handleChangeD}
                        >
                            <FormControlLabel
                                value={"POD (Pay on delivery)"}
                                control={<Radio />}
                                label={
                                    <Box>
                                        <Typography variant="body1">
                                            POD (Pay on delivery)
                    </Typography>
                                    </Box>
                                }
                            />
                        </RadioGroup>
                    </FormControl>
                </CardContent>
            </Card>
        </Fragment>
    );

    function getStepContent(stepIndex) {
        switch (stepIndex) {
            case 0:
                return Login;
            case 1:
                return selectAddress;
            case 2:
                return paymentOption;
            default:
                return "Unknown stepIndex";
        }
    }

    const handleStep = (step) => () => {
        setActiveStep(step);
    };

    const icons = {
        0: <AccountCircle color="primary" />,
        1: (
            <HomeOutlined
                color={activeStep === 1 || activeStep === 2 ? "primary" : "default"}
            />
        ),
        2: <Payment color={activeStep === 2 ? "primary" : "default"} />,
    };
    const [checked, setChecked] = React.useState(false);
    const handleChange = () => {
        setChecked((prev) => !prev);
    };
    return (
        <Fragment>
            <Container maxWidth="lg">
                <Box pt={4} pb={2}>
                    {activeStep !== steps.length && (
                        <Box top={"2px"} position="relative" mb={2}>
                            <Box
                                width={isMobile ? "100%" : "50%"}
                                pr={1}
                                style={{ margin: "0 auto" }}
                            >
                                <Stepper
                                    activeStep={activeStep}
                                    className={classes.stepperForm}
                                >
                                    {steps.map((label, index) => (
                                        <Step key={label}>
                                            <StepButton
                                                icon={icons[index]}
                                                onClick={handleStep(index)}
                                            >
                                                <Typography
                                                    color={
                                                        activeStep === index || index < activeStep
                                                            ? "primary"
                                                            : "default"
                                                    }
                                                >
                                                    {label}
                                                </Typography>
                                            </StepButton>
                                        </Step>
                                    ))}
                                </Stepper>
                            </Box>
                        </Box>
                    )}
                    <Box
                        display={isMobile ? "block" : "flex"}
                        mt={3}
                        px={isMobile ? 0 : 2}
                        height="100%"
                    >
                        <Box
                            width={
                                isMobile ? "100%" : activeStep === steps.length ? "100%" : "70%"
                            }
                            mb={2}
                            mr={0}
                            ml={0}
                            pr={isMobile ? 0 : 2}
                        >
                            {activeStep === steps.length ? (
                                <Box
                                    alignItems="center"
                                    justifyContent="center"
                                    display="flex"
                                    height="100%"
                                    flexDirection="column"
                                >
                                    {/* <Typography className={classes.instructions}>Order Placed successfully</Typography>
                                <Button onClick={() => { history.push("/orders"); }}>View orders</Button> */}
                                    <Ordersuccess
                                        cartData={cartData}
                                        cartValue={CartValue}
                                        orderData={orderData}
                                    />
                                </Box>
                            ) : (
                                    <Box>{getStepContent(activeStep)}</Box>
                                )}
                        </Box>
                        {activeStep !== steps.length && (
                            <Box width={isMobile ? "100%" : "30%"}>
                                <Collapse
                                    in={checked}
                                    collapsedHeight={cartData.length > 2 ? 256 : 190}
                                    style={{ borderRadius: "0 0 8px 8px" }}
                                >
                                    <Box id="priceDetails" mt={2} mb={1}>
                                        <Typography variant="h4">Delivery Estimates</Typography>
                                    </Box>
                                    <Paper elevation={2}>
                                        {cartData.map((cart, index) => (
                                            <Box
                                                display="inline-flex"
                                                alignItems="center"
                                                pt={index === 0 && 1}
                                                pb={1}
                                                px={1}
                                            >
                                                <Box
                                                    height={"55px"}
                                                    width={"55px"}
                                                    css={{
                                                        "& img": { transition: "transform .4s" },
                                                        "&:hover img": {
                                                            transform: "scale(1.05)",
                                                            transformOrigin: "50% 50%",
                                                        },
                                                    }}
                                                >
                                                    {
                                                        <img
                                                            width="100%"
                                                            height="100%"
                                                            style={{ objectFit: "contain" }}
                                                            alt="check"
                                                            className={classes.img}
                                                            src={Utils.GetProductImages(
                                                                cart.productAssetss,
                                                                placeholderImage
                                                            )}
                                                        />
                                                    }
                                                </Box>
                                                <Box pl={1} width="100%">
                                                    <Typography
                                                        title={cart.productShortDescription}
                                                        style={{
                                                            overflow: "hidden",
                                                            textOverflow: "ellipsis",
                                                            display: "-webkit-box",
                                                            WebkitBoxOrient: "vertical",
                                                            WebkitLineClamp: 1,
                                                        }}
                                                    >
                                                        {cart.productShortDescription}
                                                    </Typography>
                                                    <Box display="flex">
                                                        <Typography>Estimated delivery by</Typography>
                                                        <Box mr={0.5} />
                                                        <Typography variant="h6">
                                                            {format(
                                                                addDays(
                                                                    new Date(),
                                                                    parseInt(cart.deliveryLeadTime)
                                                                ),
                                                                "dd MMM yyyy"
                                                            )}
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            </Box>
                                        ))}
                                    </Paper>
                                </Collapse>
                                {cartData && cartData.length > 3 && (
                                    <Link
                                        style={{
                                            cursor: "pointer",
                                            width: "100%",
                                            background: "#fff",
                                            display: "block",
                                            textAlign: "center",
                                            paddingBottom: "7px",
                                            borderRadius: "0px 0px 8px 8px",
                                            position: " relative",
                                            top: checked ? 0 : "-25px",
                                        }}
                                        onClick={handleChange}
                                    >
                                        {checked ? `View less` : `View ${cartData.length - 3} More`}
                                    </Link>
                                )}
                                <CartPriceDetails
                                    cartValue={CartValue}
                                    mt={2}
                                    loading={cartLoading}
                                />
                                {nextStep() && (
                                    <Box mt={2}>
                                        {activeStep === steps.length ? (
                                            ""
                                        ) : (
                                                <Box width="100%">
                                                    <Button
                                                        fullWidth
                                                        variant="contained"
                                                        color="primary"
                                                        onClick={handleNext}
                                                    >
                                                        {activeStep === steps.length - 1
                                                            ? "Place Order"
                                                            : "Continue"}
                                                    </Button>
                                                </Box>
                                            )}
                                    </Box>
                                )}
                            </Box>
                        )}
                    </Box>
                    {openAddAddress && (
                        <CreateAddress
                            openAddAddress={openAddAddress}
                            handleCloseAddAddress={handleCloseAddAddress}
                            address={address}
                            addressMutate={addressMutate}
                            userdetails={userdetails}
                        />
                    )}
                </Box>
                {openDialog && (
                    <LoginDialog openDialog={openDialog} setopenDialog={setopenDialog} />
                )}
            </Container>
        </Fragment>
    );
};

export default Checkout;
