import { AxiosResponse } from 'axios';
import { Eventing } from './Eventing';
import { Attributes } from './Attributes';
import { Sync } from './Sync';

interface HasId {
    id?: string | number;
}

export class Model<T extends HasId> {
    constructor(
        protected data: T,
        protected attributes: Attributes<T> = new Attributes<T>(data),
        protected events: Eventing<T> = new Eventing<T>(data),
        protected sync: Sync<T> = new Sync<T>(
            'http://localhost:3000/users',
            data
        )
    ) {}

    get = this.attributes.get;

    set = this.attributes.set;

    on = this.events.on;

    trigger = this.events.trigger;

    fetch = async () => {
        return await this.sync.fetch().then((response: AxiosResponse<T>) => {
            this.data = response.data;
            return this.data;
        });
    };

    save = async () => {
        return await this.sync.save().then((response: AxiosResponse<T>) => {
            console.log(`save ${this.data.id} ${response.status}`);
        });
    };
}
