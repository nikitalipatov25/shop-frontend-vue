import axios from 'axios';

const API_URL = 'http://localhost:8080/user/';

import authHeader from "@/services/auth-header";

class UserService {

    getUser() {
        return axios.get(API_URL,{ headers: authHeader()})
    }

}

export default new UserService();