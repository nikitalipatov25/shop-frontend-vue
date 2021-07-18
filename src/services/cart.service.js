import axios from "axios";

import authHeader from "@/services/auth-header";

const API_URL = 'http://localhost:8080/cart/';

let user = JSON.parse(localStorage.getItem('user'));

class CartService {

    addToCart(productUUID) {
        return axios.get(API_URL + 'add?productUUID=' + productUUID, { headers: authHeader() })
    }

    getCart() {
        return axios.get(API_URL + 'get?user=' + user.username, { headers:
                authHeader()} )
    }

}

export default new CartService()