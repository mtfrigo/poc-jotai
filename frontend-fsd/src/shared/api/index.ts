import axios from "axios";
import { AxiosRequestConfig } from 'axios';

const baseURL = "http://localhost:8080";

export const api = axios.create({
    baseURL
})

export type BaseRequestParam = {
  config?: AxiosRequestConfig;
};
