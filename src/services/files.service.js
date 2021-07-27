import axios from "axios";

const API_URL = 'http://localhost:8080/file/';

class FileService {

    uploadImage(file) {
        let formData = new FormData();
        formData.append('file', file);
        return axios.post('http://localhost:8080/upload', formData, {headers: {"Content-Type": "multipart/form-data"}})
    }

    getImage(name) {
        return axios.get(API_URL + name, {headers: {"Content-Type": "multipart/form-data"}})
    }

}

export default new FileService()