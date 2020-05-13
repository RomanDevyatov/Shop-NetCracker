import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GoodService } from 'src/app/_services/good.service';
import { Good } from 'src/app/entity/good';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/_services/category.service';
import { CartService } from 'src/app/_services/cart.service';
import { BasketItem } from 'src/app/entity/basketitem';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { FeedbackService } from 'src/app/_services/feedback.service';
import { DataSharingService } from 'src/app/_services/data-sharing.service';
import { FormBuilder } from '@angular/forms';
import { NewcartService } from 'src/app/_services/newcart.service';

@Component({
  selector: 'app-good-list',
  templateUrl: './good-list.component.html',
  styleUrls: ['./good-list.component.css']
})
export class GoodListComponent implements OnInit {
  
  goods: Good[];
  items: BasketItem[]=[];
  private roles: string[];
  showAdminBoard = false;
  showModeratorBoard = false;
  showAnonymousBoard=false;
  hasAmountChanged=false;
  showModal: boolean;
  submitted = false;


  constructor(  private goodService: GoodService, 
                private newcartService: NewcartService,
                private tokenStorageService: TokenStorageService,
                private router: Router,
                private cartService: CartService,
                private feedbackService: FeedbackService,
                private dataSharingService: DataSharingService,
                private formBuilder: FormBuilder) { 
                  this.dataSharingService.hasAmountChanged.subscribe( 
                    value => {
                      this.hasAmountChanged = value;
                      if (this.hasAmountChanged) {
                        this.reloadData();
                      }
                    }
                  );
                }


  

  ngOnInit():void {    
    this.reloadData();

      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');
      this.showAnonymousBoard = this.roles.includes('ROLE_ANONYMOUS');
  }

  zeroAmount(good:Good):boolean{
    return Number(good.amount)===0;
  }

  reloadData() {
    this.goodService.getGoodsList().subscribe( 
      (result) => {
        this.goods=result;
        this.dataSharingService.hasAmountChanged.next(false);
      });  
  }
  
  deleteGood(id: number) {
    this.goodService.deleteGood(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }

  updateGood(id: number){
    this.router.navigate(['goods/update', id]);
  }
  
  goodDetails(id: number){
    this.router.navigate(['goods/details', id]);    
  }

  addGood(){
    this.router.navigate(['goods/create']); 
  }

  addFeedback(idProduct: number){
    this.feedbackService.setIdProduct(idProduct);
    this.router.navigate(['feedbacks/add']);
  }

  addToCart(product: Good){       
    this.reloadData();
    this.goodService.getGood(product.id).subscribe(
      (result) => {
        if(result.amount>0){
          this.cartService.addToCart(product, 1);            
        } else{
          alert('Товара нет на складе');
        }     
      }
    );     
  }  

  addToNewCart(product: Good){       
    this.reloadData();
    this.goodService.getGood(product.id).subscribe(
      (result) => {
        if(result.amount > 0){
          this.newcartService.addToNewcart(product, 1);            
        } else{
          alert('Товара нет на складе');
        }     
      }
    );     
  }  

  updateCartItem(good){
    this.router.navigate(['goods/update', good.id]);
  }
}