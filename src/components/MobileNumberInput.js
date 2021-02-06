import Box from "@material-ui/core/Box";
import React, { memo } from "react";
import MuiPhoneInput from "material-ui-phone-number";
import { parsePhoneNumberWithError, ParseError } from "libphonenumber-js";
const MobileNumberInput = ({
  value,
  onChange,
  error,
  seterror,
  setShowMobileNumber,
  setmobileOtp,
}) => {
  const HandleNumberChange = (formattedMobileNumber) => {
    if (setShowMobileNumber) {
      setShowMobileNumber(true);
    }
    if (setmobileOtp) {
      setmobileOtp("");
    }
    try {
      const PhoneNumber = parsePhoneNumberWithError(formattedMobileNumber);
      if (PhoneNumber) {
        PhoneNumber.formattedMobileNumber = formattedMobileNumber;
      }
      onChange(PhoneNumber);
      seterror("");
    } catch (error) {
      if (error instanceof ParseError) {
        if (error.message === "INVALID_COUNTRY") {
          seterror("Invalid country code");
        } else if (error.message === "NOT_A_NUMBER") {
          seterror("Not a valid number");
        } else if (error.message === "TOO_LONG") {
          seterror("Not a valid number");
        } else if (error.message === "TOO_SHORT") {
          seterror("Not a valid number");
        } else {
          seterror(error.message);
        }
      } else {
        throw error;
      }
    }
  };
  return (
    <Box>
      <MuiPhoneInput
        helperText={Boolean(error) ? error : "Please Provide the country code"}
        label="Mobile Number"
        value={value?.formattedMobileNumber}
        error={Boolean(error)}
        onChange={HandleNumberChange}
        fullWidth
      />
    </Box>
  );
};

export default memo(MobileNumberInput);
