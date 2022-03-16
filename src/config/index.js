import axios from 'axios';

let baseURL = 'https://api-medqcare.applimetis.id';
let webBaseURL = 'https://api-mitralab.medqcare.id'; // URL for postgres drug database

const instance = axios.create({
    baseURL: `${baseURL}/api/v1/members/`,
    headers: {
      'x-secret': 123456 
    }
});
const webInstace = axios.create({
    baseURL: `${webBaseURL}/api/v1/`,
});

export  {
	baseURL,
	webBaseURL,
	instance,
	webInstace
};
