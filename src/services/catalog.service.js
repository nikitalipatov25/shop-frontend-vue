import axios from 'axios';

const API_URL = 'http://localhost:8080/catalog/';

let pagination = '';
let sortBy = 'Name,asc';

class CatalogService {

    getAllProductsFromCatalog(page = 0, size = 4) {
        pagination = 'page=' + page + '&size=' + size;
            return axios.get(API_URL + '?' + pagination + '&sort=' + sortBy)
        }
    getProductFromCatalog(productUUID) {
        return axios.get(API_URL + productUUID)
    }

    // getCatalog(page = 0, size = 4,  category = 'empty', checkboxesArray = '', search = '', sort = 'productName,asc') {
    //     pagination = 'page=' + page + '&size=' + size;
    //     if (checkboxesArray !== '' && search !== '') {
    //         return axios.get(API_URL + 'all/catalog?' + pagination + '&category=' + category + '&checkboxes=' + checkboxesArray + '&search=' + search + '&sort=' + sort)
    //     } else if (checkboxesArray === '' && search !== '') {
    //         return axios.get(API_URL +'all/catalog?' + pagination + '&category=' + category + '&search=' + search + '&sort=' + sort)
    //     } else if (checkboxesArray !== '' && search === '') {
    //         return axios.get(API_URL +'all/catalog?' + pagination + '&category=' + category +  '&checkboxes=' + checkboxesArray + '&sort=' + sort)
    //     } else {
    //         return axios.get(API_URL +'all/catalog?' + pagination + '&category=' + category + '&sort=' + sort)
    //     }
    // }
    // getCategory(page = 0, size = 4, category, checkboxesArray = '', search = '', sort ='productName,asc') {
    //     pagination = 'page=' + page + '&size=' + size;
    //     if (checkboxesArray !== '' && search !== '') {
    //         return axios.get(API_URL +'all/catalog?' + pagination + '&category=' + category + '&checkboxes=' + checkboxesArray + '&search=' + search + '&sort=' + sort)
    //     } else if (checkboxesArray === '' && search !== '') {
    //         return axios.get(API_URL +'all/catalog?' + pagination + '&category=' + category + '&search=' + search + '&sort=' + sort)
    //     } else if (checkboxesArray !== '' && search === '') {
    //         return axios.get(API_URL +'all/catalog?' + pagination + '&category=' + category + '&checkboxes=' + checkboxesArray + '&sort=' + sort)
    //     } else {
    //         return axios.get(API_URL +'all/catalog?' + pagination + '&category=' + category + '&sort=' + sort)
    //     }
    // }
    // getCatalogItemByUUID(UUID) {
    //     return axios.get('catalog/' + UUID)
    // }
}

export default new CatalogService();