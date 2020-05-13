import { Component, OnInit } from '@angular/core';
import { Good } from 'src/app/entity/good';
import { ActivatedRoute, Router } from '@angular/router';
import { GoodService } from 'src/app/_services/good.service';
import { CartService } from 'src/app/_services/cart.service';
import { FeedbackService } from 'src/app/_services/feedback.service';
import { BasketItem } from 'src/app/entity/basketitem';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { DiscountService } from 'src/app/_services/discount.service';
import { Discount } from 'src/app/entity/discount';
import { UserService } from 'src/app/_services/user.service';
import { Feedback } from 'src/app/entity/feedback';
import { User } from 'src/app/entity/user';

@Component({
  selector: 'app-good-details',
  templateUrl: './good-details.component.html',
  styleUrls: ['./good-details.component.css']
})
export class GoodDetailsComponent implements OnInit {

  id: number;
  good: Good;
  items: BasketItem[]=[];
  item = new BasketItem();
  discountList: Discount[]=[]; 
  text:string;
  feedbackList: Feedback[]=[];
  feedbacksForGood: Feedback[]=[];
  feed= new Feedback();
  user=new User();
  private roles: string[];
  showAdminBoard = false;
  showModeratorBoard = false;
  showAnonymousBoard=false;


  showModal: boolean;
  submitted = false;

  constructor(  private cartService: CartService, 
                private feedbackService: FeedbackService,
                private tokenStorageService: TokenStorageService,
                private route: ActivatedRoute, 
                private discountService: DiscountService,
                private router: Router,
                private goodService: GoodService,
                private userService: UserService) { }

  ngOnInit(): void {
    this.good=new Good();

    this.id=this.route.snapshot.params['id'];
    this.reloadData();
    this.item.amount=1;

    const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');
      this.showAnonymousBoard = this.roles.includes('ROLE_ANONYMOUS');

      
  }


  show(){
    this.showModal=true;
    
  }

  hide()
  {
    this.showModal = false;
  }

  

  reloadData() {
    this.goodService.getGood(this.id)
      .subscribe(data => {
        this.good=data;      
        
        this.feedbackService.getFeedbacksForGood(this.id).subscribe(
          result => {
            this.feedbacksForGood=result;
          }
        )
        
      }, error=>console.log(error));
  }

  convertToCartItem(product: Good): BasketItem{
    let item=new BasketItem();
    item.user=this.tokenStorageService.getUser();
    if(item.user != null) {     
      item.good=product; //good and amount
      item.amount=1;   
        this.discountService.getDiscountsList().subscribe( (result) =>{ 
          this.discountList=result; //discountList
          item.discount=this.discountList[0];  //Discount
          this.userService.getUser(item.user.id).subscribe( (result) => {
            this.item.user=result;//got needed user 
            return item;
          });
        });
    }
    else{
        window.alert('Войдите в систему');
        this.router.navigate(['login']);    
        return undefined;
    }
  }

  isFeedbackEmpty():boolean{
    this.feedbackService.getFeedbacksForGood(this.id).subscribe(
      result => {
        this.feedbacksForGood=result;
        if(result.length>0)
          return true;
      }
    )
    return false;
  }


  deleteFeedback(id: number) {
    this.feedbackService.deleteFeedback(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }

  addFeedback(txt){
    this.user=this.tokenStorageService.getUser();
    //if (this.user != null) {
    this.userService.getUser(this.user.id).subscribe( (result) => {
      this.user=result;//got needed user 
      //user
      this.feed.user=this.user;
      //date
      let todayDate=new Date();   
      let todayDate1=new Date().toISOString();   
      console.log(todayDate1);

      let minuteTime=todayDate.getMinutes(); 
      let minutes=String(minuteTime);
      if(minuteTime < 10){
         minutes="0"+ String(minuteTime);
      }          

      let secondTime=todayDate.getMinutes(); 
      let seconds=String(secondTime);
      if(minuteTime < 10){
        seconds="0"+ String(minuteTime);
      }       
      this.feed.date=( todayDate.getDate()+ '-' + ((todayDate.getMonth() + 1)) + '-' + todayDate.getFullYear() + ' ' +todayDate.getHours() + ':' + minutes+ ':' + seconds);
      //text
      this.feed.text=txt;
      //good
      this.goodService.getGood(this.id).subscribe(
        (result) =>{
          this.feed.good=result;          
          this.feedbackService.registerFeed(this.feed);

          this.hide();
          this.reloadData();          
        }
      );
      
      
      
    });
  // } else {
  //   alert('Войдите в систему')
  //   this.router.navigate(['/login']) ;
  // }
  }

  // deleteFeedback(id){
  //   this.feedbackService.deleteFeedbackByGoodId(id)
  //     .subscribe(
  //       data => {
  //         console.log(data);
  //         this.reloadData();
  //       },
  //       error => console.log(error));
  //   // this.feedbackService.deleteFeedbackByUserIdAndDate(this.tokenStorageService.getUser().id, date)
  //   //   .subscribe(
  //   //     data => {
  //   //       console.log(data);
  //   //       this.reloadData();
  //   //     },
  //   //     error => console.log(error));
  // }

  goodList(){
    this.router.navigate(['/goods']);
  }

  zeroAmount(good:Good):boolean{
    return Number(good.amount)===0;
  }

  addToCart(product: Good, amount:number){       
    this.goodService.getGood(product.id).subscribe(
      (result) => {
    //this.goodService.getAmountByGoodId(product.id).subscribe( 
      //(result) => {      
        if(result.amount===0){
          alert('Товара нет на складе');
        }
        else
        if(amount<=result.amount){
          this.cartService.addToCart(product, amount);          
        } 
        else{
          alert('Нет такого количества');
          this.reloadData();
          this.item.amount=1;
        }
      });
  }
  
  // addFeedback(idProduct: number){
  //   this.feedbackService.setIdProduct(idProduct);
  //   this.router.navigate(['feedbacks/add']);
  // }

  checkInfinum(item):boolean{
    return item.amount<=1;
  }

  checkSupremum(item):boolean{
    return item.amount <= 0;
  }

  plusOne(){
    if(!this.checkSupremum(this.item) ){
      this.item.amount++;
      this.reloadData();
    }
  }



  minusOne(){
    if(!this.checkInfinum(this.item)){
      this.item.amount--;
      this.reloadData();
    }
  }

  checkInputAmount(amount){
    var flag=false;
    var yratext=['1','2','3','4','5','6','7','8','9'];
    if(amount<0){
      alert('Некорректное значение');
      this.item.amount=1;
    }
    else {
      let str_amount=String(amount);
      for(var i=0;i<str_amount.length;i++){
        for(var t=0;t<yratext.length;t++){
          if(str_amount[i]===yratext[t]){
            flag=true;
          }          
        }
        if(flag===true){
          flag=false;
        }else{
          alert('Некорректное значение');
          this.item.amount=1;      
          break; 
        }
      }
      
    
  }
  }
}
