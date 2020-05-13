import { User } from './user';
import { ContactType } from './contactType';

export class Contact {
    id:number;
    user:User;
    contactType:ContactType;
    value:string;
}