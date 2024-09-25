import axios from "axios";
import store from "../redux/store";
import { logout } from "../redux/authSlice";

const { dispatch, getState } = store;

export function getHeaders() {
  let userData = localStorage.getItem("userData");
  if (userData) {
    userData = JSON.parse(userData);
    return {
      Authorization: `bearer ${userData?.token}`,
    };
  }
  return {};
}

function apiReq(
  endPoint = "",
  data = {},
  method,
  headers = {},
  requestOptions = {}
) {
  return new Promise((res, rej) => {
    const getTokenHeader = getHeaders();
    headers = {
      ...getTokenHeader,
      ...headers,
    };

    if (method === "get" || method === "delete") {
      data = {
        ...requestOptions,
        ...data,
        headers,
      };
    }

    axios[method](endPoint, data, { headers })
      .then((result) => {
        const { data } = result;

        if (data.status === false) {
          return rej(data);
        }

        return res(data);
      })
      .catch((error) => {
        console.log(error);
        console.log(error && error.response, "the error response");
        if (error && error.response && error.response.status === 403) {
          dispatch(logout());
          clearUserData();
          dispatch({ type: "clearRedux" });
        }
        if (error && error.response && error.response.data) {
          if (!error.response.data.message) {
            return rej({
              ...error.response.data,
              msg: error.response.data.message || "Network Error",
            });
          }
          return rej(error.response.data);
        } else {
          return rej({ message: "Network Error", msg: "Network Error" });
        }
      });
  });
}

export function apiPost(endPoint = "", data, headers = {}) {
  return apiReq(endPoint, data, "post", headers);
}

export function apiDelete(endPoint = "", data, headers = {}) {
  return apiReq(endPoint, data, "delete", headers);
}

export function apiGet(endPoint = "", data, headers = {}, requestOptions = {}) {
  return apiReq(endPoint, data, "get", headers, requestOptions);
}

export function apiPut(endPoint = "", data, headers = {}) {
  return apiReq(endPoint, data, "put", headers);
}

export function setItem(key, data) {
  data = JSON.stringify(data);
  return localStorage.setItem(key, data);
}

export function getItem(key) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
}

export function removeItem(key) {
  return localStorage.removeItem(key);
}

export function clearAsyncStorage() {
  return localStorage.clear();
}

export function setUserData(data) {
  data = JSON.stringify(data);
  return localStorage.setItem("userData", data);
}

export function getUserData() {
  const data = localStorage.getItem("userData");
  return data ? JSON.parse(data) : null;
}

export function setFirstTime(data) {
  data = JSON.stringify(data);
  return localStorage.setItem("isFirstTime", data);
}

export function getFirstTime() {
  const data = localStorage.getItem("isFirstTime");
  return data ? JSON.parse(data) : null;
}

export function clearUserData() {
  return (
    localStorage.removeItem("userData") &&
    localStorage.removeItem("profileSetup")
  );
}
