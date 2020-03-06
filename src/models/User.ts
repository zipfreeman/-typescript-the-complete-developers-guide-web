import axios, { AxiosResponse } from 'axios';
import { MyEvent, Eventing } from './Eventing';
import { Sync } from './Sync';

export interface UserProps {
    id?: string | number;
    name: string;
    age: number;
}

interface UserEvent extends MyEvent {
    data: UserProps;
}

interface IUser {
    get(prop: string): number | string;
    set(update: Partial<UserProps>): void;
    // fetch();
    // save();
}

export class User implements IUser {
    constructor(private data: UserProps) {}

    private events: Eventing<UserProps> = new Eventing(this.data);
    private sync: Sync<UserProps> = new Sync<UserProps>(
        'http://localhost:3000/users'
    );

    url = 'http://localhost:3000/users';

    on = this.events.on;
    trigger = this.events.trigger;

    fetch = async () => {
        await this.sync.fetch.then((response: AxiosResponse) => {});
    };

    get(prop: string): number | string {
        return this.data[prop];
    }

    set(update: Partial<UserProps>): void {
        Object.assign(this.data, update);
    }
}

export const USER_LABEL = {
    id: 'id',
    name: 'name',
    age: 'age',
};
