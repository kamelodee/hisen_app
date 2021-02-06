import useSWR from "swr";
import AxiosConfigure from "../Axios.configure";
const UseFetchUser = (isLoggedIn) => {
  const fetcher = async () => {
    const data = AxiosConfigure.getDecodedAccessToken();
    const axios = await AxiosConfigure.PrivateConfigiration();
    const datas = await axios.get("userses/" + data.sub);
    return datas.data.data;
  }; 
  const { data, error, mutate } = useSWR(isLoggedIn ? `userid` : null, fetcher);
  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
    mutate
  };
};

export default UseFetchUser;
