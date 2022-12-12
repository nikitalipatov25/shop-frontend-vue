import axios from 'axios';
import authHeader from "@/services/auth-header";

// const API_URL = 'http://localhost:8080/api/category';

let API_URL;
if (process.env.NODE_ENV === 'development') {
    API_URL = 'http://localhost:8080/api/category/'
} else API_URL = 'https://hand-made-shop.herokuapp.com/api/category/'

class CategoryService {

    getCategoriesSet() {
        return axios.get(API_URL + 'get')
    }

    deleteCategory(categoryUUID) {
        return axios.delete(API_URL + 'delete/' + categoryUUID, { headers: authHeader()})
    }

    modifyCategory(id, name, image) {
        let formData = new FormData();
        formData.append("name", name);
        formData.append("image", image);
        return axios.put(API_URL + "modify/" + id, formData, { headers: authHeader()})
    }

    upload(name, image) {
        let formData = new FormData();
        formData.append("name", name);
        formData.append("image", image);
        return axios.post(API_URL + 'add', formData, { headers: authHeader()});
    }
}

export default new CategoryService();