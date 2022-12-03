import axios from "axios";

import authHeader from "@/services/auth-header";

// const API_URL = 'http://localhost:8080/comments/'

let API_URL;
if (process.env.NODE_ENV === 'development') {
    API_URL = 'http://localhost:8080/newcomments/'
} else API_URL = 'https://hand-made-shop.herokuapp.com/newcomments/'

class CommentService {

    getNewComments(productId) {
        return axios.get('http://localhost:8080/newcomments/' + productId, { headers: authHeader() })
    }

    addNewComment(productId, payload) {
        return axios.post(API_URL + productId, payload, { headers: authHeader() })
    }

    modifyNewComment(productId, payload) {
        return axios.put('http://localhost:8080/newcomments/' + productId, payload, { headers: authHeader() })
    }

    deleteNewComment(productId) {
        return axios.delete('http://localhost:8080/newcomments/' + productId, { headers: authHeader() })
    }

    getComments(id){
        return axios.get(API_URL + id, { headers: authHeader() })
    }

    generateComment(id, payload){
        return axios.post(API_URL + id, payload, { headers: authHeader() })
    }

    updateComment(id, comment){
        return axios.put(API_URL + id, comment, { headers: authHeader() })
    }

    deleteComment(id){
        return axios.delete(API_URL + id, { headers: authHeader() })
    }
}

export default new CommentService()