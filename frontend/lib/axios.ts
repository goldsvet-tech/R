"use client"

import axios, {AxiosError} from 'axios';

const fp = (localStorage.getItem('gwfp_id') ?? 'none');

export const apiRequest = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    withCredentials: true,
    timeout: 7000,
    headers: {'X-FP': fp},
});

export default apiRequest
