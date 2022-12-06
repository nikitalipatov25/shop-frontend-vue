import axios from 'axios';

// const API_URL = 'http://localhost:8080/user/';

let API_URL;
if (process.env.NODE_ENV === 'development') {
    API_URL = 'http://localhost:8080/user/'
} else API_URL = 'https://hand-made-shop.herokuapp.com/user/'

import authHeader from "@/services/auth-header";

class UserService {

    getUser() {
        return axios.get(API_URL,{ headers: authHeader()})
    }

    modifyUser(userDTO) {
        return axios.put(API_URL + 'modify', userDTO, { headers: authHeader()})
    }
}

export default new UserService();