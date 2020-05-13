import { Good } from './good';
import { User } from './user';

export class Feedback {
    public id: number;    
    public date:string;
    public text: string;
    public good: Good;
    public user: User;
}