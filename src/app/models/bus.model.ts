
import {Deserializable} from './deserializable.model';
export class Bus implements Deserializable {
    constructor(
        public id?: string,
        public model?: string,
        public availableSeats?: number,
        public seats?: Array<string>,
        public _class?: string,
        public operatorId?: string,
        public  vin?: string,
        public amenities?: any[]

    ) {}

     deserialize(input: any): this {
        return Object.assign(this, input);
     }
}

