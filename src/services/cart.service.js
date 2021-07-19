import axios from "axios";

import authHeader from "@/services/auth-header";

const API_URL = 'http://localhost:8080/cart/';

let user = JSON.parse(localStorage.getItem('user'));

class CartService {

    addToCart(productUUID) {
        return axios.get(API_URL + 'add?productUUID=' + productUUID, { headers: authHeader() })
    }

    // переписать без передачи юзернейма, т.к он есть в хедере
    getCart() {
        return axios.get(API_URL + 'get?user=' + user.username, { headers: authHeader()} )
    }

    modifyProductInCart(productUUID, payload) {
        return axios.put(API_URL + productUUID, payload, { headers: authHeader()} )
    }

    deleteProductFromCart(UUID) {
        return axios.delete(API_URL + UUID, { headers: authHeader()})
    }
}

export default new CartService()