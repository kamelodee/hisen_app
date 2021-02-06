import request from "graphql-request";
import find from "lodash/find";

const domain =
  `${window.location.hostname}` === "localhost"
    ? "hisense.myapptino.com"
    : `hisense.myapptino.com`;

class graphqpQueris {
  static getByPropertyAndDomain(propertyName) {
    return `{
   getAllByDomain(domain:"${domain}"){
     storeFrontProperty,
     dataJson
   }
 }`;
  }
  static storeFrontFetcher() {
    const fetcher = (query) =>
      request(process.env.REACT_APP_StoreFront_url, query);
    return fetcher;
  }
  static FormatResults(data, property) {
    if (data.getAllByDomain) {
      if (find(data.getAllByDomain, (o) => o.storeFrontProperty === property)) {
        return JSON.parse(
          find(data.getAllByDomain, (o) => o.storeFrontProperty === property)
            .dataJson
        );
      } else {
        return {};
      }
    } else {
      return {};
    }
  }
}
export default graphqpQueris;



