import axios from 'axios';
import authHeader from "@/services/auth-header";

let API_URL;
if (process.env.NODE_ENV === 'development') {
    API_URL = 'http://localhost:8080/api/products/'
} else API_URL = 'https://hand-made-shop.herokuapp.com/api/products/'

// process.env.NODE_ENV === 'development' ? API_URL='www/dev' : API_URL = 'www/prod'

let pagination = '';

class CatalogService {

    getByUserFilter(payload) {
        return axios.post( API_URL + 'filter', payload)
    }

    getAllProductsFromCatalog(page = 0, size = 4, sortBy = 'name') {
        pagination = 'page=' + page + '&size=' + size;
        return axios.get(API_URL + '?' + pagination + '&sort=' + sortBy);
    }

    getProductFromCatalog(productUUID) {
        return axios.get(API_URL + productUUID)
    }

    addProductToCatalog(name, description, amount, image, price, category) {
        let formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("amount", amount);
        formData.append("image", image);
        formData.append("price", price);
        formData.append("category", category);
        return axios.post(API_URL + 'add', formData, { headers: authHeader()})
    }
    modifyProductInCatalog(id, name, description, amount, image, price, category) {
        let formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("amount", amount);
        formData.append("image", image);
        formData.append("price", price);
        formData.append("category", category);
        return axios.put(API_URL + 'modify/' + id, formData, { headers: authHeader()})
    }

    deleteProductFromCatalog(productUUID) {
        return axios.delete(API_URL + 'delete/' + productUUID, { headers: authHeader()})
    }

    getPopularProducts() {
        return axios.get(API_URL + 'popular')
    }

    getNewProducts() {
        return axios.get(API_URL + 'new')
    }

}

export default new CatalogService();