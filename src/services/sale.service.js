import axios from "axios";

const API_URL = 'http://localhost:8080/api/sale';

import authHeader from "@/services/auth-header";

class PromotionsService {

    getSales() {
        return axios.get(API_URL + "/get", { headers: authHeader()})
    }

    createSale(saleDTO) {
        return axios.post(API_URL + "/add", saleDTO, { headers: authHeader()})
    }

    getPromotions() {
        return axios.get(API_URL, { headers: authHeader()})
    }

}

export default new PromotionsService()