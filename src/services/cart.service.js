import axios from "axios";

import authHeader from "@/services/auth-header";

// const API_URL = 'http://localhost:8080/api/cart';

let API_URL;
if (process.env.NODE_ENV === 'development') {
    API_URL = 'http://localhost:8080/api/cart/'
} else API_URL = 'https://hand-made-shop.herokuapp.com/api/cart/'

class CartService {

    addProductToCart(cartDTO) {
        return axios.post(API_URL + 'add', cartDTO, { headers: authHeader() })
    }

    getNewCart() {
        return axios.get(API_URL + 'get', { headers: authHeader() })
    }

    getCartSummary() {
        return axios.get(API_URL + 'summary', { headers: authHeader() })
    }

    modifyProductInCart(cartDTO) {
        return axios.put(API_URL + 'modify', cartDTO, { headers: authHeader()} )
    }

    deleteProductFromCart(productId) {
        return axios.delete(API_URL + 'delete/' + productId, { headers: authHeader()})
    }
}

export default new CartService()