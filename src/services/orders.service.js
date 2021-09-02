import axios from "axios";

import authHeader from "@/services/auth-header";

const API_URL = 'http://localhost:8080/api/order';

class OrdersService {

    generateOrder(orderType) {
        return axios.post(API_URL, orderType,{ headers: authHeader()})
    }

    createOrder(orderDTO) {
        return axios.post(API_URL + "/add", orderDTO, { headers: authHeader()})
    }

    getUserOrders() {
        return axios.get(API_URL,{ headers: authHeader()})
    }

    getOrders() {
        return axios.get(API_URL + "/get", { headers: authHeader()})
    }

    modifyOrderStatus(orderStatusDTO) {
        return axios.put(API_URL + "/modify", orderStatusDTO, { headers: authHeader()})
    }

}

export default new OrdersService()