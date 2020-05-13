import { Discount } from './discount';

export class User {
    public id: number;    
    public username: string;
    public firstName: string;
    public lastName: string;
    public email: string;
    public password: string;
    public categoryName: string;
    public birthDate: Date;
    public discount: Discount; 
}