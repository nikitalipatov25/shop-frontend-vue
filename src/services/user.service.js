import axios from 'axios';

const API_URL = 'http://localhost:8080/user/';

import authHeader from "@/services/auth-header";

class UserService {

    getUser() {
        return axios.get(API_URL,{ headers: authHeader()})
    }

    modifyUser(userDTO) {
        return axios.put(API_URL + 'modify', userDTO, { headers: authHeader()})
    }

    getUserById(userId) {
        return axios.get(API_URL  + userId, { headers: authHeader()})
    }

    promoteToAdmin(userId) {
        return axios.get(API_URL + 'promote/' + userId, { headers: authHeader()})
    }

    demoteToUser(userId) {
        return axios.get(API_URL + 'demote/' + userId, { headers: authHeader()})
    }

}

export default new UserService();