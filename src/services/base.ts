import { api } from './config/axios';

export class API {
    route: string;

    constructor(route: string) {
        this.route = route;
    }

    get = async (id: string, params?: any) => {
        const response = await api.request({
            method: 'GET',
            url: `${this.route}/${id}`,
            params,
        });
        return response;
    }

    post = async (data: any, params?: any) => {
        const response = await api.request({
            method: 'POST',
            url: this.route,
            data,
            params,
        });
        return response;
    }

    put = async (id: string, data: any, params?: any) => {
        const response = await api.request({
            method: 'PUT',
            url: `${this.route}/${id}`,
            data,
            params,
        });
        return response;
    }

    patch = async (id: string, data: any, params?: any) => {
        const response = await api.request({
            method: 'PATCH',
            url: `${this.route}/${id}`,
            data,
            params,
        });
        return response;
    }

    delete = async (id: string, params?: any) => {
        const response = await api.request({
            method: 'DELETE',
            url: `${this.route}/${id}`,
            params,
        });
        return response;
    }
}