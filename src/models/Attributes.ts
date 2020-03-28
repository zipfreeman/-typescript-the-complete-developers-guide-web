export class Attributes<T> {
    constructor(private data) {}

    get = <K extends keyof T>(prop: K): T[K] => {
        return this.data[prop];
    };

    set = (update: Partial<T>): void => {
        Object.assign(this.data, update);
    };
}

const atr = new Attributes<{ id: number; name: string }>({ id: 5 });

const id = atr.get('id');
