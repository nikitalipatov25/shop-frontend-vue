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

    getAllProductsFromCatalog(page = 0, size = 4, sortBy) {
        pagination = 'page=' + page + '&size=' + size;
        return axios.get(API_URL + '?' + pagination + '&sort=' + sortBy);
    }

    getProductFromCatalog(productUUID) {
        return axios.get(API_URL + productUUID)
    }

    addProductToCatalog(payload) {
        return axios.post(API_URL + 'add', payload, { headers: authHeader()})
    }

    deleteProductFromCatalog(productUUID) {
        return axios.delete(API_URL + 'delete/' + productUUID, { headers: authHeader()})
    }

    modifyProductInCatalog(productUUID, payload) {
        return axios.put(API_URL + 'modify/' + productUUID, payload, { headers: authHeader()})
    }

    getOneProduct(productId) {
        return axios.get(API_URL + productId, { headers: authHeader()})
    }

    getPopularProducts() {
        return axios.get(API_URL + 'popular')
    }

    getNewProducts() {
        return axios.get(API_URL + 'new')
    }

}

export default new CatalogService();