import axios, { AxiosResponse } from 'axios';
import { MyEvent, Eventing } from './Eventing';
import { Attributes } from './Attributes';
import { Sync } from './Sync';
import { Model } from './Model';

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

export class User extends Model<UserProps> {
    constructor(public data: UserProps) {
        super(data, 'http://localhost:3000/users');
    }
}
