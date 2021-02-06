import axios from "axios";
import jwtDecode from "jwt-decode";
export const PrivateBaseUrl = process.env.REACT_APP_BASE_URL;
class AxiosConfigure {
  static async PrivateConfigiration() {
    const accessToken = localStorage.getItem("access token");
    const instance = axios.create({
      baseURL: PrivateBaseUrl,
      headers: {
        Authorization: "Bearer   " + accessToken,
        "Content-Type": "application/json",
      },
    });
    await this.renewAccessTokenIfGoingExpire();
    return instance;
  }

  static async renewAccessTokenIfGoingExpire() {
    let willExpire = this.checkAccessTokenWillExpireInDay(1);
    if (willExpire) {
      let token = await this.exchangeRefreshTokenWithNewAccessToken();
      localStorage.setItem("access token", token.data.accessToken);
    }
  }
  static checkAccessTokenWillExpireInDay(days) {
    let decoded = this.getDecodedAccessToken();
    var d = new Date(decoded.exp * 1000);
    d.setDate(d.getDate() - days);
    return d === new Date();
  }
  static getDecodedAccessToken() {
    let accessToken = localStorage.getItem("access token");
    let decoded = jwtDecode(accessToken);
    return decoded;
  }
  static async checkauth() {
    const response = new Promise((res) => {
      res(Boolean(localStorage.getItem("access token")));
    });
    return response;
  }
  static async cartLocal() {
    const cartdata = localStorage.getItem("cart_data");
    const response = new Promise((res) => {
      if (cartdata) {
        res(JSON.parse(cartdata));
      } else {
        localStorage.setItem("cart_data", JSON.stringify([]));
        res(JSON.parse(cartdata));
      }
    });
    return response;
  }
  static async exchangeRefreshTokenWithNewAccessToken() {
    const accessToken = localStorage.getItem("access token");
    let username = this.getDecodedAccessToken();
    const instance = axios.create({
      baseURL: PrivateBaseUrl,
      headers: {
        Authorization: "Bearer   " + accessToken,
        "Content-Type": "application/json",
      },
    });
    let res = await instance.post("/auth/refreshToken?userId=" + username.sub);
    return res;
  }
  static async directCheckout() {
    const cartdata = localStorage.getItem("direct_checkout");
    const response = new Promise((res) => {
      if (cartdata) {
        res(JSON.parse(cartdata));
      } else {
        localStorage.setItem("direct_checkout", JSON.stringify([]));
        res(JSON.parse(cartdata));
      }
    });
    return response;
  }
}
export default AxiosConfigure;
