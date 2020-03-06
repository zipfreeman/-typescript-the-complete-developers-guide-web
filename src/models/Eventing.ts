export type Callback = <T>(event: T) => void;
export type Events = { [key: string]: Callback[] };

export interface MyEvent {
    type: string;
}

interface IEventing {
    on(eventName: string, callback: Callback): void;
    trigger(eventName: string);
}

export class Eventing<T> implements IEventing {
    types = {};

    constructor(private data: T) {}

    on(eventName: string, callback: Callback) {
        if (!this.types[eventName]) {
            this.types[eventName] = [];
        }

        this.types[eventName].push(callback);
    }

    trigger(eventName: string) {
        const handlers = this.types[eventName];
        if (!handlers || handlers.length === 0) {
            console.warn(
                new Error(`${eventName} event is not assigned to any user`)
            );

            return;
        }

        this.types[eventName].forEach((callback: Callback) => {
            callback({ type: eventName, data: this.data });
        });
    }
}
