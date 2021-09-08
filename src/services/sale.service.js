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

    getSale(saleId) {
        return axios.get(API_URL + "/get/" + saleId)
    }

    deleteSale(saleId) {
        return axios.delete(API_URL + "/delete/" + saleId, { headers: authHeader()})
    }

    modifySale(saleDTO) {
        return axios.put(API_URL + "/modify", saleDTO, { headers: authHeader()})
    }

}

export default new PromotionsService()