// import axios from "axios";
//
// // const API_URL = 'http://localhost:8080/file/';
//
// let API_URL;
// if (process.env.NODE_ENV === 'development') {
//     API_URL = 'http://localhost:8080/file/'
// } else API_URL = 'https://hand-made-shop.herokuapp.com/file/'
//
// class FileService {
//
//     uploadImage(file) {
//         let formData = new FormData();
//         formData.append('file', file);
//         return axios.post(API_URL + 'upload', formData, {headers: {"Content-Type": "multipart/form-data"}})
//     }
//
//     getImage(name) {
//         return axios.get(API_URL + name, {headers: {"Content-Type": "multipart/form-data"}})
//     }
//
// }
//
// export default new FileService()