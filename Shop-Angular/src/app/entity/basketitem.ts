import { User } from './user';
import { Good } from './good';
import { Discount } from './discount';

export class BasketItem {
    public id: number;
    public user: User;    
    public good: Good;
    public amount: number;
    public discount: Discount;    
}
