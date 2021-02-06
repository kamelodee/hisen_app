import React, { useState } from 'react';
import { Box, Button, ButtonGroup, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, TextField, Typography } from '@material-ui/core';
import { Form, useForm } from '../../../../UseForm';
import AxiosConfigure from '../../../../../Axios.configure';
import { isMobile } from 'react-device-detect';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import IconButton from '@material-ui/core/IconButton';
import MobileNumberInput from '../../../../MobileNumberInput';
import UseSnackbar from '../../../../Snackbar';
const CreateAddress = ({ openAddAddress, handleCloseAddAddress, address = {}, addressMutate, userdetails, isEdit = false, editData }) => {

    // const [isSubmitting, setIsSubmitting] = useState(false)
    async function handleSave() {
        values.branchName = " "
        values.isBilling = true
        values.isCustAddress = addressType === 'Home' ? true : false
        values.isShipping = true
        values.district = values.city
        const axios = await AxiosConfigure.PrivateConfigiration();
        if (isEdit) {
            delete values['createdOn']
            delete values['updatedOn']
            delete values['userId']
            await axios.put(`addresses/updateCustAddress/${userdetails.id}`, values);
            setOpen(true)
            setmessage('Address updated successfully')
        } else {
            await axios.post(`addresses/createCustAddress/${userdetails.id}`, values);
            setOpen(true)
            setmessage('Address created successfully')
        }
        await addressMutate(() => ({ data: [...address] }));
        await handleCloseAddAddress()
        resetForm()
    }
    const newData = {
        primaryContact: '',
        mobileNo: '',
        addressLine: '',
        locality: '',
        city: '',
        district: ' ',
        pinCodeId: "",
        state: "",
        country: "",
        regAddress: false
    }
    const initialFValues = isEdit ? editData : newData
    const [addressType, setAddressType] = useState('Home')
    const handleAddressType = (type) => {
        setAddressType(type)
    }
    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('primaryContact' in fieldValues)
            temp.primaryContact = fieldValues.primaryContact ? "" : "This field is required."
        if ('email' in fieldValues)
            temp.email = (/$^|.+@.+..+/).test(fieldValues.email) ? "" : "Email is not valid."
        if ('mobileNo' in fieldValues)
            temp.mobileNo = fieldValues.mobileNo ? fieldValues.mobileNo.length >= 8 && fieldValues.mobileNo.length <= 15 ? "" : "Invalid mobile number." : "This field is required."
        if ('addressLine' in fieldValues)
            temp.addressLine = fieldValues.addressLine ? "" : "This field is required."
        if ('city' in fieldValues)
            temp.city = fieldValues.city ? "" : "This field is required."
        if ('pinCodeId' in fieldValues)
            temp.pinCodeId = fieldValues.pinCodeId ? "" : "This field is required."
        setErrors({
            ...temp
        })

        if (fieldValues === values)
            return Object.values(temp).every(x => x === "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFValues, true, validate);

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            handleSave()
        }
    }
    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.checked
        })
    }
    const handleNumberChange = (value) => {
        setValues({ ...values, 'mobileNo': value.number })
    }
    const [open, setOpen] = React.useState(false);
    const [message, setmessage] = React.useState(false);
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
    return (
        <div>
            <Dialog fullScreen={isMobile} fullWidth={true} maxWidth={'sm'} onClose={handleCloseAddAddress} aria-labelledby="customized-dialog-title" open={openAddAddress}>
                <DialogTitle id="customized-dialog-title" onClose={handleCloseAddAddress}>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Box>Add New Address</Box>
                        {isMobile && <Box>
                            <IconButton aria-label="close" color="primary" onClick={handleCloseAddAddress}>
                                <CloseOutlinedIcon />
                            </IconButton>
                            <IconButton aria-label="save" variant="contained" autoFocus onClick={handleSubmit} color="primary">
                                <SaveOutlinedIcon />
                            </IconButton>
                        </Box>}
                    </Box>
                </DialogTitle>
                <DialogContent>
                    <Box width="100%">
                        <Form onSubmit={handleSubmit}>
                            <Box mb={1} ml={1}>
                                <Typography variant="h4">Contact Details</Typography>
                            </Box>
                            <TextField
                                fullWidth
                                required
                                name="primaryContact"
                                label="Full Name"
                                value={values.primaryContact}
                                onChange={handleInputChange}
                                error={errors.primaryContact}
                                {...(errors.primaryContact && { error: true, helperText: errors.primaryContact })}
                            />
                            {/* <TextField
                                fullWidth
                                required
                                label="Mobile"
                                name="mobileNo"
                                type="number"
                                value={values.mobileNo}
                                onChange={handleInputChange}
                                error={errors.mobileNo}
                                {...(errors.mobileNo && { error: true, helperText: errors.mobileNo })}
                            /> */}
                            <MobileNumberInput value={{ formattedMobileNumber: values.mobileNo }} error={errors.mobileNo} seterror={setErrors}
                                onChange={handleNumberChange} />
                            <Box ml={1} mb={1} mt={2}>
                                <Typography variant="h4">Address</Typography>
                            </Box>
                            <TextField
                                fullWidth
                                required
                                label="Address Line"
                                name="addressLine"
                                value={values.addressLine}
                                onChange={handleInputChange}
                                error={errors.addressLine}
                                {...(errors.addressLine && { error: true, helperText: errors.addressLine })}
                            />
                            <TextField
                                fullWidth
                                label="Locality / Town"
                                name="locality"
                                value={values.locality}
                                onChange={handleInputChange}
                            />
                            <Box display="flex">
                                <Box width="50%" mr={1}>
                                    <TextField
                                        fullWidth
                                        required
                                        label="City / District"
                                        name="city"
                                        value={values.city}
                                        onChange={handleInputChange}
                                        {...(errors.city && { error: true, helperText: errors.city })}
                                    />
                                </Box>
                                <Box width="50%">
                                    <TextField
                                        fullWidth
                                        required
                                        label="Pin Code / Zip Code"
                                        name="pinCodeId"
                                        value={values.pinCodeId}
                                        onChange={handleInputChange}
                                        {...(errors.pinCodeId && { error: true, helperText: errors.pinCodeId })}
                                    />
                                </Box>
                            </Box>
                            <Box display="flex">
                                <Box width="50%" mr={1}>
                                    <TextField
                                        fullWidth
                                        label="State / Province / Region"
                                        name="state"
                                        value={values.state}
                                        onChange={handleInputChange}
                                    />
                                </Box>
                                <Box width="50%">
                                    <TextField
                                        fullWidth
                                        label="Country"
                                        name="country"
                                        value={values.country}
                                        onChange={handleInputChange}
                                    />
                                </Box>
                            </Box>

                            <Box ml={1} mb={1} mt={2}>
                                <Typography variant="h4">Save Address As</Typography>
                            </Box>
                            <Box ml={1} mb={1}>
                                <ButtonGroup disableElevation color="primary">
                                    <Button variant={addressType === 'Home' ? "contained" : "outlined"} onClick={() => { handleAddressType('Home') }}>Home</Button>
                                    <Button variant={addressType === 'Work' ? "contained" : "outlined"} onClick={() => { handleAddressType('Work') }}>Work</Button>
                                </ButtonGroup>
                            </Box>
                            <Box ml={1}>
                                <FormControlLabel
                                    control={<Checkbox checked={values.regAddress} onChange={handleChange} name="regAddress" />}
                                    label="Make this my default address"
                                />
                            </Box>
                        </Form>
                    </Box>
                </DialogContent>
                {!isMobile && <DialogActions>
                    <Button autoFocus onClick={handleCloseAddAddress} color="primary">
                        Cancel
              </Button>
                    <Box mr={1}>
                        <Button variant="contained" autoFocus onClick={handleSubmit} color="primary">
                            Save
              </Button>
                    </Box>
                </DialogActions>}
            </Dialog>
            {open && <UseSnackbar open={open} handleClose={handleClose} severity={"success"} message={message} />}
        </div>
    )
}

export default CreateAddress;