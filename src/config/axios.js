import axios from 'axios';

const axiosFetch = axios.create({
  baseURL: 'http://localhost:4000/'
});

export default axiosFetch;