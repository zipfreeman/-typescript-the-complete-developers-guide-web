import axios, { AxiosResponse } from 'axios';
import { Eventing } from './Eventing';

export const USER_LABEL = {
    id: 'id',
    name: 'name',
    age: 'age',
};

export interface UserProps {
    id?: string | number;
    name: string;
    age: number;
}

export interface UserEvent {
    type: string;
    data: UserProps;
}

interface IUser {
    get(prop: string): number | string;
    set(update: Partial<UserProps>): void;
    fetch();
    save();
}

export class User implements IUser {
    events: Eventing<UserProps> = new Eventing();
    url = 'http://localhost:3000/users';

    constructor(private data: UserProps) {}

    get(prop: string): number | string {
        return this.data[prop];
    }

    set(update: Partial<UserProps>): void {
        Object.assign(this.data, update);
    }

    fetch(): void {
        axios
            .get(`${this.url}/${this.get(USER_LABEL.id)}`)
            .then((response: AxiosResponse) => {
                this.set(response.data);
            });
    }

    save() {
        const id = this.get(USER_LABEL.id);

        if (id) {
            axios.put(`${this.url}/${id}`, this.data);
            return;
        }

        axios.post(`${this.url}`, this.data);
    }
}
