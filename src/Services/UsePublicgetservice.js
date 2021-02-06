import useSWR from "swr";
const REACT_APP_HOME_PAGE_URL = process.env.REACT_APP_PublicAccess_url;
const fetcher = (...args) => fetch(...args).then((res) => res.json());
const UsePublicgetservice = (path, suspense) => {
  const { data, error } = useSWR(
    `${REACT_APP_HOME_PAGE_URL}/${path}`,
    fetcher,
    {
      revalidateOnFocus: false,
      suspense,
    }
  );
  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default UsePublicgetservice;
