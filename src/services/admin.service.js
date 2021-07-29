import axios from "axios";

import authHeader from "@/services/auth-header";

const API_URL = 'http://localhost:8080/';

class AdminService {

    getProductFromCatalog(productUUID) {
        return axios.get(API_URL + 'catalog/' + productUUID, { headers: authHeader()})
    }

    addProductToCatalog(payload) {
        return axios.post(API_URL + 'catalog/add', payload, { headers: authHeader()})
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

    generatePromotion(payload) {
        return axios.post(API_URL + 'promotions/' , payload, { headers: authHeader()})
    }
}

export default new AdminService()