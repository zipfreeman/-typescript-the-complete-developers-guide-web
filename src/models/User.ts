import axios, { AxiosResponse } from 'axios';
import { MyEvent, Eventing } from './Eventing';
import { Attributes } from './Attributes';
import { Sync } from './Sync';

export interface UserProps {
    id?: string | number;
    name: string;
    age: number;
}
/*
the actual User class API is event based.
events:
 - login
 - logout
 - update
 - (maybe) delete user

someone logs in = the user data is fetched and set
someone changes their name or age = the user data is saved
 -- therefore, change = set + save

*/

export class User {
    constructor(private data: UserProps) {}

    private url = 'http://localhost:3000/users';
    private attributes: Attributes<UserProps> = new Attributes(this.data);
    private events: Eventing<UserProps> = new Eventing(this.data);
    private sync: Sync<UserProps> = new Sync(this.url, this.data);

    get = this.attributes.get;

    set = (update: Partial<UserProps>) => {
        return this.attributes.set(update);
    };

    on = this.events.on;
    trigger = this.events.trigger;

    fetch = async () => {
        return await this.sync
            .fetch()
            .then((response: AxiosResponse<UserProps>) => {
                this.data = response.data;
                return this.data;
            });
    };

    save = async () => {
        return await this.sync
            .save()
            .then((response: AxiosResponse<UserProps>) => {
                return response.data;
            });
    };
}
