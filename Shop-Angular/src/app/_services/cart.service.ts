import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { BasketItem } from '../entity/basketitem';
import { Good } from '../entity/good';
import { TokenStorageService } from './token-storage.service';
import { DiscountService } from './discount.service';
import { Discount } from '../entity/discount';
import { async } from 'rxjs/internal/scheduler/async';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConditionalExpr } from '@angular/compiler';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { OrderHistory } from '../entity/orderhistory';
import { Observable, throwError, timer, Subscription } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UserService } from './user.service';
import { User } from '../entity/user';
import { GoodService } from './good.service';
import { Entry } from '../entity/entry';

export interface TimeSpan {
  hours: number;
  minutes: number;
  seconds: number;
}

const ORDER_API = 'http://localhost:8080/api/auth/';
const FEEDBACK_API = 'http://localhost:8080/api/feedbacks/add';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class CartService {
  private baseUrl = 'http://localhost:8080/api/orderhistorys/create';
  private baseUrl1 = 'http://localhost:8080/api/baskets/create';
  private baseUrl2 = 'http://localhost:8080/api/baskets';
  private baseUrl3 = 'http://localhost:8080/api/baskets/amount';
  private baseUrl4 = 'http://localhost:8080/api/baskets/add';
  private baseUrl5 = 'http://localhost:8080/api/baskets';
  private baseUrl6 = 'http://localhost:8080/api/baskets/refresh'; 
  private baseUrl7 = 'http://localhost:8080/api/baskets/delete';
  private baseUrl8 = 'http://localhost:8080/api/baskets/addone';
  private baseUrl9 = 'http://localhost:8080/api/baskets/discount';

  len:number;
  item=new BasketItem();//Good User Amount Discount
  items: BasketItem[]=[];
  basketIitems: BasketItem[]=[];
  discountList: Discount[]=[];
  discounts: Discount[]=[];
  str:string;
  time:Entry;
  entries: Entry[];
  newName: string;
  
  countDown: Subscription;
  counter = 1800;
  tick = 1000;
  
  constructor(  private tokenStorageServer: TokenStorageService, 
                private discountService:DiscountService,
                private http:HttpClient,
                private router: Router,
                private userService: UserService,
                private goodService: GoodService
                ) {                  
                 }

public addEntry(){
  this.entries.push({
    created: new Date(),
    name: this.newName
  });
  this.newName = 'basketCreatedStart';
}

startCountdown(){
  this.countDown = timer(0, this.tick).subscribe(() => --this.counter);
}

getCurrrentCountDown(){
  return this.counter;
}

getCounter(tick) {
  return timer(0, tick);
}

setNewName(name:string){
  this.newName=name;
}

getElapsedTime(entry: Entry): TimeSpan {        
  let totalSeconds = Math.floor((new Date().getTime() - entry.created.getTime()) / 1000);
  
  let hours = 0;
  let minutes = 0;
  let seconds = 0;

  if (totalSeconds >= 3600) {
    hours = Math.floor(totalSeconds / 3600);      
    totalSeconds -= 3600 * hours;      
  }

  if (totalSeconds >= 60) {
    minutes = Math.floor(totalSeconds / 60);
    totalSeconds -= 60 * minutes;
  }

  seconds = totalSeconds;
  
  return {
    hours: hours,
    minutes: minutes,
    seconds: seconds
  };
}

getStr(){
  return this.str;
}
                
addToCart(product: Good, amount_:number){  
    this.item.user=this.tokenStorageServer.getUser();
    if(this.item.user!=null) {     
      this.item.good=product; //good and amount
      this.item.amount=amount_;   
        this.discountService.getDiscountsList().subscribe( (result) =>{ 
          this.discountList=result; //discountList
          console.log('this.discountList: ',this.discountList);
          this.item.discount=this.discountList[0];  //Discount
          //this.item.discount=undefined;
          this.userService.getUser(this.item.user.id).subscribe( (result) => {
            this.item.user=result;//got needed user 
            this.addBasketItem(this.item);
            this.goodService.updateGoodAmount(this.item.good.id, Number(product.amount)-Number(amount_)).subscribe(
              data =>{  
                this.router.navigate(['cart']);
              });         
            });
        });
    }
    else{
        window.alert(
        'Войдите в систему'
        );
        this.router.navigate(['login']);    
    }
  }

  refreshDublicate(arr: BasketItem[]){    
    if(arr.length > 1){      
      var newArr: BasketItem[]=[];     
      let curr=arr[0];
      let sumAmount=curr.amount;
      console.log('sumAmount: ',sumAmount, 'curr ', curr);
      for(let i=1; i<arr.length; i++){
        if(curr.good.name===arr[i].good.name){
            sumAmount=sumAmount+arr[i].amount;
        }
        else{
          curr.amount=sumAmount;
          newArr.push(curr);
          curr=arr[i];
          sumAmount=curr.amount;
        }      
        if(i===arr.length-1){
        this.router.navigate(['login']); 
        }
        console.log('newArr: ',newArr);
      }      
      return newArr;
    }else {return  arr;}
  }


  getItems(){    
    return this.items;
  }

  

  getBasketItemsList(): Observable<any> {
    return this.http.get(`${this.baseUrl2}`);
  }

  getBasketItemsListForCurrentUser(id: User):Observable<any>{
    return this.http.get(`${this.baseUrl5}/${id}`);
  }

  public registerBasketItems(obj: BasketItem[]) { 
    this.http.post(this.baseUrl1, obj, httpOptions).subscribe(
      (data) => { // Success
        console.log(data)
      },
      (error) => {
        console.error("Error: " + JSON.stringify(error));
      }
    );
  }

  public addBasketItem(obj: BasketItem) { 
    console.log('obj: ', obj);
    this.http.post(this.baseUrl4, obj, httpOptions).subscribe(
      (data) => { // Success
        console.log(data)
      },
      (error) => {
        console.error("Error: " + JSON.stringify(error));
      }
    );
  }

  public refreshBasket(){
    this.http.post(this.baseUrl6, {},httpOptions).subscribe(
      data => {
        console.log(data);
      },
      (error) => {
        console.error("Error: " + JSON.stringify(error));
      }
    );
  }

  public updateBasketItemAmount(id:number, amount:number): Observable<any>{
    return this.http.put(`${this.baseUrl3}/${id}`, amount);
  }

  public updateBasketItemDiscount(id:number, discount:Discount):Observable<any>{
    return this.http.put(`${this.baseUrl9}/${id}`, discount);
  }

  public addOneBasketItem(id:number, amount:number):Observable<any>{
    return this.http.put(`${this.baseUrl8}/${id}`, amount);
  }

  public registerOrderHistory(obj: OrderHistory[]) {
    //console.log('object in register:', obj);        
    this.http.post(this.baseUrl, obj, httpOptions).subscribe(
      (data) => { // Success
        console.log(data)
      },
      (error) => {
        console.error("Error: " + JSON.stringify(error));
      }
    );
  }
  
  getLen():number{
    return this.len;
  }
  
  deleteItem(id:number){    
    //this.items.splice(id,1);    
  }

  deleteBasketItem(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl2}/${id}`, { responseType: 'text' });
  }

  clearBasketItem(): Observable<any>{
    console.log('зашел в deleteAll');
    return this.http.delete(`${this.baseUrl2}`, { responseType: 'text' });
  }

  clearBasketItemForCurrentUser(id: number): Observable<any> {
    console.log('id: ', id);
    return this.http.delete(`${this.baseUrl7}/${id}`, { responseType: 'text' });    
  }
}

@Pipe({
  name: 'formatTime'
})
export class FormatTimePipe implements PipeTransform {
  transform(value: number): string {
    const minutes: number = Math.floor(value / 60);
    return (
      ("00" + minutes).slice(-2) +
      ":" +
      ("00" + Math.floor(value - minutes * 60)).slice(-2)
    );
  }
}