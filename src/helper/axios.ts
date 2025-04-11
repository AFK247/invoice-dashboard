import CONFIG from '@/config'
import axios from 'axios'

// Axios instance with a base URL and default headers
const AXIOS = axios.create({
  baseURL: CONFIG.apiBaseUrl + '/api/v1',
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 30000
})

export default AXIOS
