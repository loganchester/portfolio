import axios from 'axios';

const API_URL = import.meta.env.PUBLIC_API_URL;

export const api = axios.create({
    withCredentials: false,
    baseURL: `${API_URL}`,
})
