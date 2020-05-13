import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { BasketItem } from '../entity/basketitem';
import { TokenStorageService } from './token-storage.service';
import { Good } from '../entity/good';
import { UserService } from './user.service';
import { GoodService } from './good.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../entity/user';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class NewcartService {

  private baseUrl = 'http://localhost:8080/api/baskets';

  basketItems: BasketItem[]=[];

  constructor(
    private http:HttpClient,
    private tokenStorageService: TokenStorageService,
    private userService:UserService,
    private goodService: GoodService,
    private router: Router,
  ) { }

  
  // front
  setBasketItemToLocalStorage(){
    localStorage.basketItems=JSON.stringify(this.basketItems);    
  }

  getBasketItemToLocalStorage():BasketItem[]{
    return JSON.parse(localStorage.basketItems);
  }

  findItemByName(name: string): number{
    let i=0;
    console.log(this.basketItems, this.basketItems.length);
    for(i; i < this.basketItems.length; i++) { 
      if(this.basketItems[i].good.name===name) {
        console.log(this.basketItems[i].good.name, ' === ', name);
        return i;
      }
    }    
    return -1;
  }

  checkTheSameGood(item:BasketItem):boolean{
    const indexItem=this.findItemByName(item.good.name);
    if(indexItem > -1){
      this.basketItems[indexItem].amount++;
      return true;
    }    
    else return false;
  }

  addBasketItem(item: BasketItem){
    console.log('добавил в баскет: ', item);
    if(this.checkTheSameGood(item)===false){
      this.basketItems.push(item);
      this.setBasketItemToLocalStorage();      
    }    
  }

  plusBasketItem(item: BasketItem){
    console.log('+1: ', item.good.amount, item.good.name);
    const indexItem=this.findItemByName(item.good.name);
    console.log('index: ', indexItem);
    if(indexItem > -1){
      this.basketItems[indexItem].amount++;
    }    
  }

  minusBasketItem(item: BasketItem){
    console.log('-1: ', item.good.amount);
    const indexItem=this.findItemByName(item.good.name);
    if(indexItem > -1){
      this.basketItems[indexItem].amount--; 
    }   
  }

  deleteBasketItem(item:BasketItem){
    const indexItem=this.findItemByName(item.good.name);
    if(indexItem > -1){
      this.basketItems.splice(indexItem, 1);
    }
  }

  clearNewcart(){
    this.basketItems.length=0;
    this.router.navigate(['goods']);
  }

  addToNewcart(good: Good, amount:number){  
    var basketItem=new BasketItem();
    var user=this.tokenStorageService.getUser();
    if(user!=null) {        
      basketItem.good=good;
      basketItem.amount=amount;
      basketItem.discount=undefined; //Discount
      this.userService.getUser(user.id).subscribe( 
        (result) => {
          basketItem.user=result;//got needed user           
          console.log('добавляю в новую корзину: ', basketItem);          
          this.addBasketItem(basketItem);        
          this.router.navigate(['newcart']);     
      });        
    } else {
        window.alert(
          'Войдите в систему'
        );
        this.router.navigate(['login']);    
      }
  }

  getBasketItemList():BasketItem[]{
    return this.basketItems;
  }

  confirmItems(){
    // this.cartService.getBasketItemsListForCurrentUser(this.tokenStorageService.getUser().id)
    // .subscribe( (result) => {
    //   this.items=result; 
    //     for(let i=0; i<this.items.length; i++){    
    //       {      
    //       this.orderHistory.push(new OrderHistory);
    //       //date
    //       let todayDate=new Date();        
    //       this.orderHistory[i].date=( todayDate.getDate()+ '-' + ((todayDate.getMonth() + 1)) + '-' + todayDate.getFullYear() + ' ' +todayDate.getHours() + ':' + todayDate.getMinutes()+ ':' + todayDate.getSeconds());
    //       console.log(this.orderHistory[i].date);
    //       //good
    //       this.orderHistory[i].good=this.items[i].good;
    //       //user    
    //       this.orderHistory[i].user=this.items[i].user;      
    //       //price
    //       this.orderHistory[i].price=this.items[i].good.price;
    //       //discount
    //       this.orderHistory[i].discount=this.items[i].discount;
    //       //amount
    //       this.orderHistory[i].amount=this.items[i].amount;   
    //       }
    //     }        
    //     this.cartService.registerOrderHistory(this.orderHistory);  
           
    //     this.cartService.clearBasketItemForCurrentUser(this.tokenStorageService.getUser().id)
    //       .subscribe(
    //         value => {
    //           this.router.navigate(['/goods']); 
    //       });      
    // });  
  }

  clearBasketItems(){
    this.basketItems.length = 0;
  }

  // back
  getBasketItemsListForCurrentUser(user: User):Observable<any>{
    return this.http.get(`${this.baseUrl}/${user.id}`);
  }

  public updateGoodAmount(item: BasketItem, setAmount:number){
    this.goodService.updateGoodAmount(item.good.id, setAmount).subscribe(
      data =>{  
        this.router.navigate(['cart']);
    });      
  }
}
