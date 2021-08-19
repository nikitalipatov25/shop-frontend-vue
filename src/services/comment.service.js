import axios from "axios";

import authHeader from "@/services/auth-header";

const API_URL = 'http://localhost:8080/comments/'

class CommentService {

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

    generateAnswer(id, payload){
        return axios.post(API_URL + id + '/answer', payload, { headers: authHeader() })
    }

    deleteAnswer(id){
        return axios.delete(API_URL + id + '/answer', { headers: authHeader() })
    }

    getAnswers(id){
        return axios.get(API_URL + id + '/answer', { headers: authHeader() })
    }

}

export default new CommentService()