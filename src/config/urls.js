export const API_BASE_URL = "http://localhost:3000/api/";

export const getApiUrl = (endpoint = "") => API_BASE_URL + endpoint;

export const ONBOARDING = getApiUrl("User/list_tutorials");
export const SOCIAL_LOGIN = getApiUrl("User/list_tutorials");
export const LOGIN = getApiUrl("login");
export const ALL_COURSES = getApiUrl("courses");
export const ADD_COURSE = getApiUrl("admin/courses");
export const UPDATE_COURSE = getApiUrl("admin/courses");





// public apis
export const GET_ALL_STATES =
  "https://countriesnow.space/api/v0.1/countries/states";
export const GET_ALL_CITES =
  "https://countriesnow.space/api/v0.1/countries/state/cities";
