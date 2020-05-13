import { Component, OnInit, ViewContainerRef, ComponentFactoryResolver, OnDestroy, ChangeDetectorRef, Pipe, PipeTransform  } from '@angular/core';
import { CartService } from 'src/app/_services/cart.service';
import { BasketItem } from 'src/app/entity/basketitem';
import { Observable, interval, Subject, timer, Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { OrderHistory } from 'src/app/entity/orderhistory';
import { Discount } from 'src/app/entity/discount';
import { DiscountService } from 'src/app/_services/discount.service';
import { User } from 'src/app/entity/user';
import { UserService } from 'src/app/_services/user.service';
import { GoodService } from 'src/app/_services/good.service';
import { Good } from 'src/app/entity/good';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { DataSharingService } from 'src/app/_services/data-sharing.service';
import { AuthService } from 'src/app/_services/auth.service';
import { Entry } from 'src/app/entity/entry';
// @Injectable()
// export class MyService {
//   getCounter(tick) {
//     return timer(0, tick);
//   }
// }

export interface TimeSpan {
  hours: number;
  minutes: number;
  seconds: number;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {  
  good: Good;
  items: BasketItem[]=[];

  isEmptyItems: boolean=true;
  orderHistory: OrderHistory[]=[]; 
  discountList: Discount[]=[];  
  isAddedProduct = false;
  hasAmountChanged: boolean=false;
  prev=0;
  discount:number;
  discList: Discount[]=[];
  entries: Entry[]=[];
  newName:string;

  countDown: Subscription;
  counter = 1800;
  tick = 1000;
  
  constructor(  //private myService: MyService,
                private route: ActivatedRoute,
                private authService: AuthService,
                private cartService: CartService, 
                private discountService: DiscountService,
                private userService: UserService, 
                private router: Router, 
                private goodService: GoodService,
                private tokenStorageService: TokenStorageService,
                private dataSharingService: DataSharingService,
                private viewContainerRef: ViewContainerRef,
                private componentFactoryResolver: ComponentFactoryResolver,
                private changeDetector: ChangeDetectorRef) { 
                  this.cartService.getBasketItemsListForCurrentUser(this.tokenStorageService.getUser().id).subscribe( 
                    (result) => {
                      this.items=result;
                      this.discountService.getDiscountsList().subscribe( (result) =>{ 
                        console.log('discList: ',result );
                        this.discList=result;
                      });
                      console.log(this.cartService.getStr());
                    });  

                  //   this.dataSharingService.hasAmountChanged.subscribe(
                  //   value =>{
                  //     this.isAddedProduct = value;
                  //     this.cartService.getBasketItemsListForCurrentUser(this.tokenStorageService.getUser().id).subscribe( 
                  //       (result) => {      
                  //         console.log('загрузил из basket:', result);                    
                  //         this.items=result;
                  //       });  
                  //   }
                  // );
                }

  // hasAmountChangedFunc(){
    //private destroyed$ = new Subject();
  // }
  ngOnDestroy(): void{
    // this.destroyed$.next();
    // this.destroyed$.complete();

    //this.countDown=null;
  }

  ngOnInit():void {
    //this.countDown = timer(0, this.tick).subscribe(() => --this.counter);
    this.countDown = this.cartService
      .getCounter(this.tick)
      .subscribe(() => this.counter--);
    //this.cartService.startCountdown();
    this.reloadData();
    // this.cartService.setNewName('first');
    // this.cartService.addEntry();
    // this.newName = 'Корзина очистится через: ';
    // this.addEntry();
    
    // interval(1000).subscribe(() => {
    //   if (!this.changeDetector['destroyed']) {
    //     this.changeDetector.detectChanges();
    //   }
    // });

    // this.changeDetector.detectChanges();
  }

  getCurrCountDown(){
    this.counter=this.cartService.getCurrrentCountDown();
    console.log("изменяю");
  }

  

  // addEntry() {
  //   this.entries.push({
  //     created: new Date(),
  //     name: this.newName
  //   });
  //   this.newName= '';
  // }

  // getElapsedTime(entry: Entry): TimeSpan {        
  //   let totalSeconds = Math.floor((new Date().getTime() - entry.created.getTime()) / 1000);
  //   console.log('here');
  //   let hours = 0;
  //   let minutes = 0;
  //   let seconds = 0;

  //   if (totalSeconds >= 3600) {
  //     hours = Math.floor(totalSeconds / 3600);      
  //     totalSeconds -= 3600 * hours;      
  //   }

  //   if (totalSeconds >= 60) {
  //     minutes = Math.floor(totalSeconds / 60);
  //     totalSeconds -= 60 * minutes;
  //   }

  //   seconds = totalSeconds;
    
  //   return {
  //     hours: hours,
  //     minutes: minutes,
  //     seconds: seconds
  //   };
  // }

  checkAvailability(items):number{
    for(let i=0; i<this.items.length; i++){
      if(items[i].good.amount===0){
        return i;
      }    
    }
    return -1;
  }

  isEmpty(): boolean{
    return this.items.length===0;
  }

  confirmItems(){
    this.cartService.getBasketItemsListForCurrentUser(this.tokenStorageService.getUser().id)
      .subscribe( (result) => {
        this.items=result; 
          for(let i=0; i<this.items.length; i++){   
          {      
            this.orderHistory.push(new OrderHistory);
            //date
            let todayDate=new Date();        
            this.orderHistory[i].date=( todayDate.getDate()+ '-' + ((todayDate.getMonth() + 1)) + '-' + todayDate.getFullYear() + ' ' +todayDate.getHours() + ':' + todayDate.getMinutes()+ ':' + todayDate.getSeconds());
            console.log(this.orderHistory[i].date);
            //good
            this.orderHistory[i].good=this.items[i].good;
            //user    
            this.orderHistory[i].user=this.items[i].user;      
            //price
            this.orderHistory[i].price=this.items[i].good.price;
            //discount
            this.orderHistory[i].discount=this.items[i].user.discount;
            //amount
            this.orderHistory[i].amount=this.items[i].amount;   
            }
          }         
            this.cartService.registerOrderHistory(this.orderHistory);  
             
          this.cartService.clearBasketItemForCurrentUser(this.tokenStorageService.getUser().id)
            .subscribe(
              value => {
                this.router.navigate(['/goods']); 
            });       
      });           
  }    

  reloadData() {    
      this.cartService.getBasketItemsListForCurrentUser(this.tokenStorageService.getUser().id)//.toPromise();
      .subscribe( 
        (result) => {
          this.items=result;
        });  
  }

  checkInfinum(item):boolean{
    return item.amount<=1;
  }

  checkSupremum(item):boolean{
    return item.good.amount<=0;
  }

  findCheckDiscount(amount):Discount {     
    let disc=undefined;
    if(amount >= 10) {
      disc = this.discList[3];
    } else if(amount >= 7) {
      disc = this.discList[2];
    }else if(amount >= 5) {
      disc = this.discList[1];
    }else if(amount >= 0) {
      disc = this.discList[0];
    }   
    return disc;
  }

  plusOneProduct(item){    
    this.goodService.getGood(item.good.id)
      .subscribe(data => {
        let good=data; 
        if(good.amount > 0){
        this.cartService.addOneBasketItem(item.id, 1).subscribe(
          data => {
            this.goodService.updateGoodAmount(item.good.id, Number(good.amount)-1).subscribe(
              () =>{ 
                    this.reloadData();
              }); 
          }); 
        }
        else{
          alert('на складе больше нет');
          this.reloadData();
        }
      });
  }
  refresh(){
    this.reloadData();
  }

  minusOneProduct(item){  
    console.log(this.cartService.getStr()); 
    this.reloadData();
    this.goodService.getGood(item.good.id).subscribe(
      data => {
        let good=data;  
        this.cartService.addOneBasketItem(item.id, -1).subscribe(
          data => {        
            this.goodService.updateGoodAmount(item.good.id, Number(good.amount)+1).subscribe(
              data => {  
                this.cartService.updateBasketItemDiscount(item.id, this.findCheckDiscount(item.amount-1)).subscribe(
                  data => {  
                    this.reloadData();
                  }
                );
              }
            );  
          }
        );
      }
    );    
  }

  changeAmount(item: BasketItem, amount:number){
    this.goodService.getGood(item.good.id).subscribe(
      value =>{
        let prev=value;
        if(amount > 0){
          if(prev.amount < amount){
            if(Number(amount-prev.amount) <= Number(item.good.amount)){
              this.cartService.updateBasketItemAmount(item.id, amount).subscribe(
                data => {                                    
                  this.goodService.updateGoodAmount(item.good.id, Number(item.good.amount)-(amount-prev.amount)).subscribe(
                    data =>{  
                      this.reloadData();
                    });  
                }
              );
            }
            else{
              alert('На складе нет такого количества');
              this.reloadData();
            }
          }
          else if(prev.amount > amount){
            this.cartService.updateBasketItemAmount(item.id, amount).subscribe(
              data => {                                    
                this.goodService.updateGoodAmount(item.good.id, Number(item.good.amount)+(prev.amount-amount)).subscribe(
                  data =>{  
                    this.reloadData();
                  });  
              }
            );
          }
          else if(prev.amount === amount){
            this.reloadData();
          }
        }
        else{
          this.reloadData();
        }
      }
    );   
    
  }

  deleteItem(id: number){
    this.cartService.deleteItem(id);      
    this.isEmptyItems=(this.items.length===0); 
  }

  clearCart(){        
    this.cartService.clearBasketItemForCurrentUser(this.tokenStorageService.getUser().id).subscribe(
      value =>{        
        this.router.navigate(['/goods']); 
      }
    );
  }

  deleteBasketItem(item: BasketItem) {
    this.goodService.getGood(item.good.id)
      .subscribe(
        data => {
          let good=data;    
          this.goodService.updateGoodAmount(item.good.id, Number(good.amount)+item.amount)
            .subscribe(
              data =>{  
                this.cartService.deleteBasketItem(item.id)
                  .subscribe(
                    data => {
                      this.reloadData();
                    }
                  );        
              }
            );
        }
      );              
  }

  isBasketEmpty():boolean{
    return this.items===null;
  }

  zeroAmount(cartIm):boolean{
    return cartIm.good.amount===0;
  }

  getSumma(): number{
    let summa=0;
    for(let i=0; i<this.items.length;i++){
        summa=summa+this.items[i].good.price*this.items[i].amount*(1-this.items[i].user.discount.percent/100);
    }
    return summa;
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

