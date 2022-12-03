import axios from "axios";

// const API_URL = 'http://localhost:8080/api/sale';

let API_URL;
if (process.env.NODE_ENV === 'development') {
    API_URL = 'http://localhost:8080/api/sale/'
} else API_URL = 'https://hand-made-shop.herokuapp.com/api/sale/'

import authHeader from "@/services/auth-header";

class PromotionsService {

    getSales() {
        return axios.get(API_URL + "get", { headers: authHeader()})
    }

    createSale(name, image, date, expirationDate, discount, products) {
        let formData = new FormData();
        formData.append("name", name);
        formData.append("image", image);
        formData.append("date", date);
        formData.append("expirationDate", expirationDate);
        formData.append("discount", discount);
        formData.append("products", products);
        return axios.post(API_URL + "add", formData, { headers: authHeader()})
    }

    getSale(saleId) {
        return axios.get(API_URL + "get/" + saleId)
    }

    getSaleByName(name) {
        return axios.get(API_URL + "get/" + name)
    }

    deleteSale(saleId) {
        return axios.delete(API_URL + "delete/" + saleId, { headers: authHeader()})
    }

    modifySale(id, name, image, date, expirationDate, discount, products) {
        let formData = new FormData();
        formData.append("name", name);
        formData.append("image", image);
        formData.append("date", date);
        formData.append("expirationDate", expirationDate);
        formData.append("discount", discount);
        formData.append("products", products);
        return axios.put(API_URL + "modify/" + id, formData, { headers: authHeader()})
    }

}

export default new PromotionsService()