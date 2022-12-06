import axios from "axios";

import authHeader from "@/services/auth-header";

// const API_URL = 'http://localhost:8080/api/order';

let API_URL;
if (process.env.NODE_ENV === 'development') {
    API_URL = 'http://localhost:8080/api/order/'
} else API_URL = 'https://hand-made-shop.herokuapp.com/api/order/'

class OrdersService {

    createOrder(orderDTO) {
        return axios.post(API_URL + "add", orderDTO, { headers: authHeader()})
    }

    getOrders() {
        return axios.get(API_URL + "get", { headers: authHeader()})
    }

    cancelOrder(id) {
        return axios.delete(API_URL + "cancel/" + id, { headers: authHeader()})
    }

    confirmReceipt(id) {
        return axios.get(API_URL + "confirm/" + id, { headers: authHeader()})
    }


    modifyOrderStatus(orderStatusDTO) {
        return axios.put(API_URL + "modify", orderStatusDTO, { headers: authHeader()})
    }

}

export default new OrdersService()