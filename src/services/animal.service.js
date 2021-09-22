import axios from 'axios';
import authHeader from "@/services/auth-header";

let API_URL;
if (process.env.NODE_ENV === 'development') {
  API_URL = 'http://localhost:8080/api/animal/'
} else API_URL = 'https://hand-made-shop.herokuapp.com/api/animal/'

class AnimalService {

    getAnimals() {
        return axios.get(API_URL + 'get')
    }

    getAnimal(animalName) {
        return axios.get(API_URL + 'get/' + animalName)
    }

    addAnimal(animalDTO) {
        return axios.post(API_URL + 'add', animalDTO, { headers: authHeader()})
    }

    deleteAnimal(animalUUID) {
        return axios.delete(API_URL + 'delete/' + animalUUID, { headers: authHeader()})
    }

    modifyAnimal(animalUUID, animalDTO) {
        return axios.put(API_URL + 'modify/' + animalUUID, animalDTO, { headers: authHeader()})
    }
}

export default new AnimalService();