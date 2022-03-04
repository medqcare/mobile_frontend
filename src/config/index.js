import axios from 'axios';

let baseURL = 'https://api-medqcare.applimetis.id';
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
