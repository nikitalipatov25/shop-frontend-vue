import axios from "axios";

import authHeader from "@/services/auth-header";

const API_URL = 'http://localhost:8080/orders/';

class OrdersService {

    generateOrder(orderType) {
        return axios.post(API_URL, orderType,{ headers: authHeader()})
    }

}

export default new OrdersService()