export type Callback = <T>(event: T) => void;
export type Events = { [key: string]: Callback[] };

export interface MyEvent {
    type: string;
}

interface EventTypesCache {
    [key: string]: Callback[];
}

interface IEventing {
    on(eventName: string, callback: Callback): void;
    trigger(eventName: string);
}

export class Eventing<T> implements IEventing {
    types: EventTypesCache;

    constructor(private data: T) {
        this.types = {};
    }

    on = (eventName: string, callback: Callback) => {
        if (!this.types[eventName]) {
            this.types[eventName] = [];
        }

        this.types[eventName].push(callback);
    };

    trigger = (eventName: string) => {
        const handlers = this.types[eventName];
        if (!handlers || handlers.length === 0) {
            console.warn(
                new Error(`${eventName} triggers but no one is listening`)
            );

            return;
        }

        this.types[eventName].forEach((callback: Callback) => {
            callback({ type: eventName, target: this.data });
        });
    };
}
