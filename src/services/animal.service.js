import axios from 'axios';

const API_URL = 'http://localhost:8080';

class AnimalService {
    getAnimalsList() {
        return axios.get(API_URL + '/api/admin/animals')
    }
}

export default new AnimalService();