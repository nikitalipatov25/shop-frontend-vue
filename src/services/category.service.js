import axios from 'axios';

const API_URL = 'http://localhost:8080';

class CategoryService {
    getCategoriesList() {
        return axios.get(API_URL + '/api/admin/categories')
    }
}
export default new CategoryService();