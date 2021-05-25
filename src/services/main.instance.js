import axios from "axios";
// import store from "@/store";

const instance = axios.create({
  baseURL: "https://pokeapi.co/api/v2/"
});


const PublishInstance = {
  async query(resource, params) {
    return instance.get(resource, params);
  },

  async download(resource, params, type) {
    return instance.get(resource, { params, responseType: type });
  },

  async fetch(resource, slug = "", params) {
    return instance.get(`${resource}/${slug}`, params);
  },

  async post(resource, params, config) {
    return instance.post(`${resource}`, params, config);
  },

  async create(resource, slug = "", params, config) {
    return instance.post(`${resource}/${slug}`, params, config);
  },

  async update(resource, slug, params) {
    return instance.put(`${resource}/${slug}`, params);
  },

  async put(resource, params) {
    return instance.put(`${resource}`, params);
  },

  async delete(resource, config) {
    return instance.delete(resource, config);
  },

  async deleteSlug(resource, slug, config) {
    return instance.delete(`${resource}/${slug}`, config);
  }
};

export default PublishInstance;
