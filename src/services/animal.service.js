import axios from 'axios';

const API_URL = 'http://localhost:8080/api/animal';

class AnimalService {
    getAnimals() {
        return axios.get(API_URL + '/get')
    }
    getAnimal(animalName) {
        return axios.get(API_URL + '/get/' + animalName)
    }
}

export default new AnimalService();