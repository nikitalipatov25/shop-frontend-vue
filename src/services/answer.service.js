import axios from "axios";

import authHeader from "@/services/auth-header";

let API_URL;
if (process.env.NODE_ENV === 'development') {
    API_URL = 'http://localhost:8080/newanswer/'
} else API_URL = 'https://hand-made-shop.herokuapp.com/newanswer/'

class AnswerService {

    addAnswer(payload){
        return axios.post(API_URL, payload, { headers: authHeader() })
    }
    deleteAnswer(id){
        return axios.delete(API_URL + id + 'answer', { headers: authHeader() })
    }
    getAnswers(id){
        return axios.get(API_URL + id + 'answer', { headers: authHeader() })
    }
}

export default new AnswerService();
