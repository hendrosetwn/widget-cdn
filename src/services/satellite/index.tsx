import axios from 'axios';
import { APIKey } from '@utils/environment';

const satellite = axios.create({
  headers: {
    'X-Content-Type-Options': 'nosniff',
    'X-XSS-Protection': '1; mode=block',
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
    'X-Frame-Options': 'SAMEORIGIN',
    'Content-Type': 'application/json',
    apiKey: APIKey,
  },
});

satellite.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default satellite;
