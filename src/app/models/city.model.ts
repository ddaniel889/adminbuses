import { Location } from './location';
export class City {
    constructor(
        public fullName?: string,
        public cityUrl?: string,
        public location?: Location,
        public id?: string
    ) {}
}
