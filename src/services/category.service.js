import axios from "axios";
// import authHeader from "./auth-header";
const API_URL = "http://localhost:8080/api/category";
const getCategories = () => {
  return axios.get(API_URL + "/");
};
const getCategoriesWithKeyword = () => {
  return axios.get(API_URL + "/:name");
};
const createCategory = () => {
  return axios.post(API_URL + "/create");
};
const updateCategory = () => {
  return axios.put(API_URL + "/update/:id");
};
const lockCategory = () => {
  return axios.get(API_URL + "/lock/:id");
};
const unlockCategory = () => {
  return axios.get(API_URL + "/unlock/:id");
};
const CategoryService = {
  getCategories,
  getCategoriesWithKeyword,
  createCategory,
  updateCategory,
  lockCategory,
  unlockCategory,
};
export default CategoryService;