import * as urls from "../config/urls";
import { apiDelete, apiGet, apiPost, apiPut } from "../utils/utils";

// public apis
export function getAllStates(data) {
  return apiPost(urls.GET_ALL_STATES, data);
}

export function getAllCities(data) {
  return apiPost(urls.GET_ALL_CITES, data);
}
export function loginUSer(data) {
  return apiPost(urls.LOGIN, data);
}
export function getAllCourses(query="") {
  return apiGet(urls.ALL_COURSES + query);
}
export function addNewCourse(data) {
  return apiPost(urls.ADD_COURSE, data);
}
export function updateCourse(data, id) {
  return apiPut(`${urls.UPDATE_COURSE}/${id}`, data);
}

export function deleteCourse(id) {
  return apiDelete(`${urls.UPDATE_COURSE}/${id}`);
}
