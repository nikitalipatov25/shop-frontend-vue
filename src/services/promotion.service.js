import axios from "axios";

const API_URL = 'http://localhost:8080/promotions/';

import authHeader from "@/services/auth-header";

class PromotionsService {

    generatePromotion(payload) {
        return axios.post(API_URL, payload, { headers: authHeader()})
    }

}

export default new PromotionsService()