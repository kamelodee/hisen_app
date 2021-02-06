import React, { Fragment, useState, useEffect, memo } from "react";
import Accounting from "accounting-js";
import Skeleton from "@material-ui/lab/Skeleton";
import useSWR from "swr";
const fetcher = (...args) => fetch(...args).then((res) => res.json());
const Pricingformat = ({ value }) => {
  const [data, setdata] = useState(null);
 
  const sellerDatares={
 symbol: "GHC",
  decimal: ".",
  thousand: ",",
  precision: 2,}

  useEffect(() => {
    if (sellerDatares) {
      setdata(sellerDatares);
    }
  }, []);
  return (
    <Fragment >
      {data ? (
        Accounting.formatMoney(parseFloat(value), {
          symbol: data?.symbol,
          decimal: data?.decimal,
          thousand: data?.thousand,
          precision: data?.precision,
        })
      ) : (
        <Skeleton />
      )}
    </Fragment>
  );
};

export default memo(Pricingformat);
