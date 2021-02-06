import _ from 'lodash';

export const floatConvertion = (value, roundoff) => {
  return parseFloat(value.toFixed(roundoff))
}
export const getProductDiscount = (unitListPrice, defaultDiscountPrice) => {
  var discount =
    100 - parseFloat((unitListPrice / defaultDiscountPrice).toFixed(2)) * 100;
  return discount.toFixed(2);
}
export const cartCalculation = (cartData, data, precision = 2, taxExemption, onChange) => {
  var cartValue = {
    totalItems: cartData.length,
    subTotal: 0,
    overallTax: 0,
    grandTotal: 0,
    totalLP: 0
  }
  cartData.forEach(item => {
    if (!onChange) {
      var cartdata = _.find(data, ['productId', item.brandProductId])
      item.askedQuantity = cartdata.quantity
      item.cartPrice = cartdata.cartPrice
    }
    item.deliveryLeadTime = item.standardLeadTime
    item.productAsset = item.productAssetss[0].source
    item.quantity = item.askedQuantity
    item.packagingQuantity = item.packagingQty ? item.packagingQty : item.packagingQuantity
    item.minOrderQuantity = item.minOrderQuantity ? item.minOrderQuantity : item.packagingQuantity
    item.checkMOQ = item.minOrderQuantity ? item.minOrderQuantity > item.askedQuantity ? true : false : false
    item.unitListPrice = floatConvertion(item.unitListPrice, precision)
    item.unitPrice = item.defaultDiscountPrice ? item.defaultDiscountPrice : item.unitListPrice;
    item.discount = getProductDiscount(item.unitListPrice, item.unitPrice)
    item.addonCost = 0;
    item.totalPrice = floatConvertion(item.quantity * item.unitPrice, precision)
    item.tax = parseFloat(item.hsnTax)
    item.prodTax = floatConvertion(floatConvertion(item.totalPrice * parseFloat(item.hsnTax), precision) / 100, precision);
    item.totalLP = floatConvertion(item.unitListPrice * item.quantity, precision)
    cartValue.totalLP = floatConvertion(cartValue.totalLP + item.totalLP, precision);
    cartValue.overallTax = floatConvertion(cartValue.overallTax + item.prodTax, precision)
    cartValue.subTotal = floatConvertion(cartValue.subTotal + item.totalPrice, precision);
    cartValue.grandTotal = floatConvertion(cartValue.subTotal + cartValue.overallTax, precision);
  })
  return { cartData, cartValue }
}

export const discountDetails = (cartData, isSeller, taxExemption, precision = 2) => {
  cartData.forEach(item => {
    item.packagingQuantity = item.packagingQty ? item.packagingQty : item.packagingQuantity
    item.minOrderQuantity = item.minOrderQuantity ? item.minOrderQuantity : item.packagingQuantity
    item.checkMOQ = item.minOrderQuantity ? item.minOrderQuantity > item.askedQuantity ? true : false : false
    item.unitListPrice = item.discountDetails.buyerListPrice ? item.discountDetails.buyerListPrice :
      item.discountDetails.unitListPrice ? item.discountDetails.unitListPrice :
        item.unitListPrice
    item.unitLP = item.unitListPrice
    item.productCost = item.discountDetails.productCost ? item.discountDetails.productCost : 0
    item.bcProductCost = item.discountDetails.bcProductCost ? item.discountDetails.bcProductCost : 0
    item.productCostLoad = item.discountDetails.productCost ? item.discountDetails.productCost : 0
    if (item.productId) {
      if (item.discountDetails.specialDiscount != null && item.discountDetails.specialDiscount !== 0) {
        item.discountPercentage = item.discountDetails.specialDiscount;
        item.discountedPrice = item.discountDetails.specialDiscountPrice;
      } else if (item.discountDetails.annualDiscount != null && item.discountDetails.annualDiscount !== 0) {
        item.discountPercentage = item.discountDetails.annualDiscount;
        item.discountedPrice = item.discountDetails.annualDiscountPrice;
      } else {
        item.discountPercentage = item.discountDetails.defaultDiscount ? item.discountDetails.defaultDiscount : 0;
        item.discountedPrice = item.discountDetails.defaultDiscountPrice ? item.discountDetails.defaultDiscountPrice : item.discountDetails.unitListPrice;
      }
    }
    item.discount = item.discountPercentage
    item.unitPrice = item.discountedPrice
    item.totalPrice = item.quantity * item.unitPrice
    // dmc calculation
    item.addonCost = 0;
    item.productShortDescription = item.productShortDescription ? item.productShortDescription : item.shortDescription
    item.askedQuantity = item.quantity
    if (!taxExemption) {
      item.tax = parseFloat(item.hsnDetails.tax)
    } else {
      item.tax = 0;
    }
    item.hsnCode = item.hsnDetails.hsnCode
  })
  return cartData;
}

export const addMoreUtils = (item, isSeller, taxExemption, precision = 2) => {
  item.unitListPrice = item.discountDetails.buyerListPrice ? item.discountDetails.buyerListPrice :
    item.discountDetails.unitListPrice ? item.discountDetails.unitListPrice :
      item.unitListPrice
  item.productCost = item.discountDetails.productCost ? item.discountDetails.productCost : 0
  item.bcProductCost = item.discountDetails.bcProductCost ? item.discountDetails.bcProductCost : 0
  if (item.discountDetails.specialDiscount != null && item.discountDetails.specialDiscount !== 0) {
    item.discountPercentage = item.discountDetails.specialDiscount;
    item.discountedPrice = item.discountDetails.specialDiscountPrice;
  } else if (item.discountDetails.annualDiscount != null && item.discountDetails.annualDiscount !== 0) {
    item.discountPercentage = item.discountDetails.annualDiscount;
    item.discountedPrice = item.discountDetails.annualDiscountPrice;
  } else {
    item.discountPercentage = item.discountDetails.defaultDiscount ? item.discountDetails.defaultDiscount : 0;
    item.discountedPrice = item.discountDetails.defaultDiscountPrice ? item.discountDetails.defaultDiscountPrice : item.discountDetails.unitListPrice;
  }
  if (!item.volumeDiscountApplied) {
    item.discount = item.discountPercentage
    item.unitPrice = item.discountedPrice
  }
  item.addonCost = 0;
  if (item.productCost > 0 && item.unitPrice > 0) {
    item.dmc = parseFloat((((item.productCost + item.addonCost) / item.unitPrice) * 100).toFixed(precision));
    item.marginPercentage = 100 - item.dmc;
  } else {
    item.dmc = 100;
    item.marginPercentage = 100 - item.dmc
  }
  item.productShortDescription = item.shortDescription
  item.packagingQuantity = item.packagingQty ? item.packagingQty : item.packagingQuantity
  item.askedQuantity = item.quantity
  item.totalPrice = item.unitPrice * item.askedQuantity;
  if (!taxExemption) {
    item.tax = parseFloat(item.hsnDetails.tax)
  } else {
    item.tax = 0
  }
  item.hsnCode = item.hsnDetails.hsnCode
  if (!item.showPrice && !isSeller) {
    item.discountedPrice = 0;
    item.buyerRequestedPrice = 0;
    item.unitPrice = item.discountedPrice;
  } else {
    if (isSeller) {
      item.buyerRequestedPrice = 0;
    } else {
      item.buyerRequestedPrice = item.unitPrice
    }
  }
  return item;
}