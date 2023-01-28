import axios from "axios"
import {AxiosInstance} from "axios";

const req:AxiosInstance = axios.create({
  timeout: 30000,
})

// interceptors can be added here

export default req
