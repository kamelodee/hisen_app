import useSWR from "swr";
import AxiosConfigure from "../Axios.configure";
import UseAuth from "./UseAuth";

const UseAddressServices = (path, suspense) => {
  const fetcher = async () => {
    const data = AxiosConfigure.getDecodedAccessToken();
    const axios = await AxiosConfigure.PrivateConfigiration();
    const datas = await axios.get(path + data.sub);
    return datas.data;
  };
  const options = {
    revalidateOnFocus: false,
    shouldRetryOnError: false,
    suspense,
  };
  const { data: isLoggedin } = UseAuth();
  const { data, error, mutate } = useSWR(
    isLoggedin ? `addressFetch` : null, fetcher, options
  );
  return {
    data: data ? data.data : [],
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};

export default UseAddressServices;

