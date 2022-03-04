import axios from 'axios';

// let baseURL = 'https://api-medqcare.applimetis.id';
let baseURL = 'http://192.168.1.5:8080'
// let webBaseURL = 'https://b9ba-140-213-33-176.ngrok.io'; // URL for postgres drug database
let webBaseURL = 'https://api-qcareweb.applimetis.id'

const instance = axios.create({
    baseURL: `${baseURL}/api/v1/members/`,
    headers: {
      'x-secret': 123456 
    }
});

module.exports = {
  baseURL,
  webBaseURL,
  instance
};
