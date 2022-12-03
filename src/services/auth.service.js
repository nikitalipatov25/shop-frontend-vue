import axios from 'axios';

// const API_URL = 'http://localhost:8080/api/auth/';

let API_URL;
if (process.env.NODE_ENV === 'development') {
    API_URL = 'http://localhost:8080/api/auth/'
} else API_URL = 'https://hand-made-shop.herokuapp.com/api/auth/'

class AuthService {
    login(user) {
        return axios
            .post(API_URL + 'signin', {
                username: user.username,
                password: user.password
            })
            .then(response => {
                if (response.data.accessToken) {
                    localStorage.setItem('user', JSON.stringify(response.data));
                }

                return response.data;
            });
    }

    logout() {
        localStorage.removeItem('user');
    }

    register(user) {
        let payload = {
            username: user.username,
            email: user.email,
            password: user.password,
            surname: user.surname,
            name: user.name
        }
        return axios.post(API_URL + 'signup', payload);
    }
}

export default new AuthService();