import axios from 'axios';

const API_URL = 'http://localhost:8080/api/category';

class CategoryService {
    getCategoriesSet() {
        return axios.get(API_URL + '/get')
    }
}
export default new CategoryService();