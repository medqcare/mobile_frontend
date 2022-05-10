import axios from 'axios';

let baseURL = 'https://api-demo-mobile.medqcare.id';

const instance = axios.create({
    baseURL: `${baseURL}/api/v1/members/`,
    headers: {
      'x-secret': 123456 
    },
    timeout: 4000
});

export  {
    baseURL,
    instance,
};
