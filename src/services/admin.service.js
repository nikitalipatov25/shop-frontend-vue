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