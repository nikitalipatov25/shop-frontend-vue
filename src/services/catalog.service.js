import axios from 'axios';

const API_URL = 'http://localhost:8080/api/products/';

let pagination = '';

class CatalogService {

    getByUserFilter(payload) {
        return axios.post(API_URL + 'filter', payload)
    }

    getAllProductsFromCatalog(page = 0, size = 4, sortBy) {
        pagination = 'page=' + page + '&size=' + size;
        return axios.get(API_URL + '?' + pagination + '&sort=' + sortBy);
    }

    getProductFromCatalog(productUUID) {
        return axios.get(API_URL + productUUID)
    }

}

export default new CatalogService();