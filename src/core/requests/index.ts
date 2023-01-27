import axios from "axios"
import {AxiosInstance} from "axios";

// todo: move the configuration to a config file?
const req:AxiosInstance = axios.create({
  baseURL: 'https://test.mydomain.com',
  timeout: 30000,
})

// interceptors can be added here

export default req
