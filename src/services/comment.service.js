import axios from "axios";

import authHeader from "@/services/auth-header";

const API_URL = 'http://localhost:8080/comments/'

class CommentService {

    getComments(id){
        return axios.get(API_URL + id, { headers: authHeader() })
    }

    generateComment(id, comment){
        return axios.post(API_URL + id, comment, { headers: authHeader() })
    }

    updateComment(id, comment){
        return axios.put(API_URL + id, comment, { headers: authHeader() })
    }

    deleteComment(id){
        return axios.delete(API_URL + id, { headers: authHeader() })
    }

}

export default new CommentService()