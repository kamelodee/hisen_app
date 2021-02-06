import _ from 'lodash';
import AxiosConfigure from "../../../Axios.configure";
export const requestBody = (...props) => {
  const [companyId, selectedAddress, cartValue, cartData] = props
  const userData = AxiosConfigure.getDecodedAccessToken();
  var body = {
    "orderDescription": "string",
    "orderName": `order-${new Date().toLocaleDateString()}-${new Date().toLocaleTimeString()}`,
    "orderIdentifier": "string",
    "orderVersion": 0,
    "buyerId":  parseInt(userData.sub),
    "sellerCompanyId": 1,
    "sellerBranchId": 1,
    "shippingAddressId": selectedAddress.id,
    "orderTerms": {
      "insurance": "string",
      "insuranceValue": 0,
      "paymentTerms": "string",
      "ptValue": 0,
      "packageForwarding": "string",
      "pfValue": 0,
      "freight": "string",
      "freightValue": 0,
      "warranty": "string",
      "warrantyValue": 0,
      "deliveryTerms": "string",
      "dtValue": 0,
      "dispatchInstructions": "string",
      "diValue": 0,
      "insuranceId": 0,
      "paymentTermsId": 0,
      "packageForwardingId": 0,
      "freightId": 0,
      "warrantyId": 0,
      "deliveryTermsId": 0,
      "dispatchInstructionsId": 0
    },
    "shippingAddressDetails": {
      "shippingName": selectedAddress.primaryContact,
      "shippingMobileNumber": selectedAddress.mobileNo,
      "shippingAddressLine": selectedAddress.addressLine,
      "shippingBranchName": selectedAddress.branchName,
      "shippingCity": selectedAddress.city,
      "shippingCountry": selectedAddress.country,
      "shippingDistrict": selectedAddress.district,
      "shippingGstin": selectedAddress.gst,
      "shippingLocality": selectedAddress.locality,
      "shippingPincode": selectedAddress.pinCodeId,
      "shippingState": selectedAddress.state
    },
    "billingAddressDetails": {
      "billingName": selectedAddress.primaryContact,
      "billingMobileNumber": selectedAddress.mobileNo,
      "billingAddressLine": selectedAddress.addressLine,
      "billingBranchName": selectedAddress.branchName,
      "billingCity": selectedAddress.city,
      "billingCountry": selectedAddress.country,
      "billingDistrict": selectedAddress.district,
      "billingGstin": selectedAddress.gst,
      "billingLocality": selectedAddress.locality,
      "billingPincode": selectedAddress.pinCodeId,
      "billingState": selectedAddress.state
    },
    "domainURL": window.location.origin,
    "overallTax": cartValue.overallTax,
    "subTotal": cartValue.subTotal,
    "grandTotal": cartValue.grandTotal,
    "orderDeliveryDate": "string",
    "uploadedDocumentDetails": [],
    "dbProductDetails": cartData,
    "deliveryDate": "string",
    "customerRequiredDate": new Date().toISOString(),
    "notes": "string",
    "versionCreatedTimestamp": new Date().toISOString(),
    "modifiedByUsername": "Naren hardcoded",
    "buyerReferenceNumber": null,
    "sellerReferenceNumber": "string",
    "sellerCompanyName": "string",
    "sellerBranchName": "string",
    "addonCost": 0,
    "taxExemption": false,
    "taxMessage": "string",
    "shippingIncluded": true,
    "buyerCurrencyCode": "INR",
    "buyerCurrencyFactor": 1
  }
  return body
}