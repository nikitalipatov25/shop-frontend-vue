import axios from "axios";

const API_URL = 'http://localhost:8080/file/';

class FileService {

    uploadImage(file) {
        let formData = new FormData();
        formData.append('file', file);
        return axios.post(API_URL + 'upload', formData, {headers: {"Content-Type": "multipart/form-data"}})
    }

}

export default new FileService()