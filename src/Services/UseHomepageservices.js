import useSWR from "swr";
import graphqpQueris from "../graphqlQueries";
const UseHomepageservices = (property, suspense, revalidateOnMount) => {
  const { data, error } = useSWR(
    graphqpQueris.getByPropertyAndDomain(),
    graphqpQueris.storeFrontFetcher(),
    {
      revalidateOnFocus: false,
      shouldRetryOnError: true,
      suspense,
      revalidateOnMount: revalidateOnMount ? revalidateOnMount : !suspense,
    }
  );
  return {
    data: graphqpQueris.FormatResults(data || {}, property),
    isLoading: !error && !data,
    isError: error,
    alldata: data,
  };
};

export default UseHomepageservices;
