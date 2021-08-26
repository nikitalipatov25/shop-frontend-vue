import axios from "axios";

import authHeader from "@/services/auth-header";

const API_URL = 'http://localhost:8080/';

class AdminService {

    getAnimals() {
        return axios.get(API_URL + 'api/admin/get/animals', { headers: authHeader()})
    }

    getAnimal(animalName) {
        return axios.get(API_URL + 'api/admin/get/animal/' + animalName, { headers: authHeader()})
    }

    getCategories() {
            return axios.get(API_URL + 'api/admin/categories', { headers: authHeader()})
    }

    // addAnimals(animal, categories) {
    //     return axios.get(API_URL + 'api/admin/add/' + animal + '/' + categories,  { headers: authHeader()})
    // }
    //
    // addCategories(payload) {
    //     return axios.post(API_URL + 'animal/add/', payload, { headers: authHeader()})
    // }

    getProductFromCatalog(productUUID) {
        return axios.get(API_URL + 'catalog/' + productUUID, { headers: authHeader()})
    }

    addProductToCatalog(payload) {
        return axios.post(API_URL + 'api/admin/add/product', payload, { headers: authHeader()})
    }

    deleteProductFromCatalog(productUUID) {
        return axios.delete(API_URL + 'catalog/delete/' + productUUID, { headers: authHeader()})
    }

    modifyProductInCatalog(productUUID, payload) {
        return axios.put(API_URL + 'catalog/modify/' + productUUID, payload, { headers: authHeader()})
    }

    uploadImage(file) {
        let formData = new FormData();
        formData.append('file', file);
        return axios.post(API_URL + 'upload', formData, {headers: {"Content-Type": "multipart/form-data"}})
    }

    // generatePromotion(payload) {
    //     return axios.post(API_URL + 'promotions/' , payload, { headers: authHeader()})
    // }
}

export default new AdminService()