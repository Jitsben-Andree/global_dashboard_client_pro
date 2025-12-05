import axios from 'axios';

const apiAdapter = axios.create({
  timeout: 10000, 
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiAdapter;