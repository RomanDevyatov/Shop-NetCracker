import { Good } from './good';
import { User } from './user';
import { Discount } from './discount';

export class OrderHistory {
    public id: number;    
    public date: string;
    public good: Good;
    public user: User;
    public price: number;
    public discount: Discount;
    public amount: number;        
}