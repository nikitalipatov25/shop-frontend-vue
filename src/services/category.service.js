import axios from 'axios';
import authHeader from "@/services/auth-header";

// const API_URL = 'http://localhost:8080/api/category';

let API_URL;
if (process.env.NODE_ENV === 'development') {
    API_URL = 'http://localhost:8080/api/category/'
} else API_URL = 'https://hand-made-shop.herokuapp.com/api/category/'

class CategoryService {

    getCategory(categoryUUID) {
        return axios.get(API_URL + 'get/' + categoryUUID)
    }

    getCategoriesSet() {
        return axios.get(API_URL + 'get')
    }

    addCategory(categoryDTO) {
        return axios.post(API_URL + 'add', categoryDTO, { headers: authHeader()})
    }

    deleteCategory(categoryUUID) {
        return axios.delete(API_URL + 'delete/' + categoryUUID, { headers: authHeader()})
    }

    modifyCategory(categoryUUID, categoryDTO) {
        return axios.put(API_URL + "modify/" + categoryUUID, categoryDTO, { headers: authHeader()})
    }
}

export default new CategoryService();