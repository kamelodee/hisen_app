import useSWR from "swr";
import AxiosConfigure from "../Axios.configure";
import UseAuth from "./UseAuth";

const UseCheckoutservices = (buyNow, suspense) => {
  const fetcher = async () => {
    const data = AxiosConfigure.getDecodedAccessToken();
    const axios = await AxiosConfigure.PrivateConfigiration();
    const datas = await axios.get("carts?find=ByUserId&userId=" + data.sub);
    return datas.data.data;
  };


  const localfetcher = async () => {
    const res = await AxiosConfigure.cartLocal();
    return res;
  };

  const directCheckoutFetch = async () => {
    const res = await AxiosConfigure.directCheckout();
    return res;
  };

  const options = {
    shouldRetryOnError: false,
    suspense,
  };

  const { data: isLoggedin } = UseAuth();
  const { data, error, mutate } = useSWR(
    isLoggedin ? buyNow ? `cartfetchDirect` : `cartfetchserver` : buyNow ? `cartfetchDirect` : 'cartfetchLocal',
    isLoggedin ? buyNow ? directCheckoutFetch : fetcher : buyNow ? directCheckoutFetch : localfetcher,
    options
  );
  
  return {
    data: data ? (data.data ? data.data : data) : [],
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};

export default UseCheckoutservices;
