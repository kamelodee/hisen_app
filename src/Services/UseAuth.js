import useSWR from "swr";
import AxiosConfigure from "../Axios.configure";

const UseAuth = () => {
  const fetcher = () => AxiosConfigure.checkauth();
  const { data, error } = useSWR(`auth`, fetcher);
  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default UseAuth;
