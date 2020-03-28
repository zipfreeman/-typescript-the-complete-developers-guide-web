import axios, { AxiosResponse, AxiosPromise } from 'axios';
import { UserProps } from './User';

interface HasId {
    id?: string | number;
}

export class Sync<T extends HasId> {
    defaultUrl = 'http://localhost:3000/users';

    constructor(public rootUrl, private data: T) {}

    fetch = (): Promise<AxiosResponse<UserProps>> => {
        return axios.get(`${this.rootUrl}/${this.data.id}`);
    };

    save = (): Promise<AxiosResponse<UserProps>> => {
        if (this.data.id && this.data.id > 0) {
            return axios.put(`${this.rootUrl}/${this.data.id}`, this.data);
        }

        return axios.post(`${this.rootUrl}`, this.data);
    };
}
