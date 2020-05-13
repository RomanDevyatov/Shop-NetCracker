import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from 'src/app/_services/cart.service';
import { BasketItem } from 'src/app/entity/basketitem';
import { NewcartService } from 'src/app/_services/newcart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-newcart',
  templateUrl: './newcart.component.html',
  styleUrls: ['./newcart.component.css']
})
export class NewcartComponent implements OnInit, OnDestroy {

  basketItems: BasketItem[]=[];

  constructor(
    private newcartService: NewcartService,
    private router: Router
  ) { }

  // front

  ngOnInit(): void {
    this.reloadData();
  }

  reloadData(){
    this.basketItems=this.newcartService.getBasketItemList();
    console.log('ngOnInit: ', this.basketItems);
  }

  ngOnDestroy(): void{
    console.log('задестроил');    
  }

  checkSupremum(item: BasketItem):boolean{
    return item.good.amount<=0;
  }

  checkInfinum(item: BasketItem):boolean{
    return item.good.amount<1;
  }

  isEmpty(){
    return this.basketItems.length===0;
  }
  
  plusOneBasketItem(item: BasketItem){
    this.newcartService.plusBasketItem(item);
  }

  minusOneBasketItem(item: BasketItem){
    this.newcartService.minusBasketItem(item);
  }

  

  confirmItems(){
    this.newcartService.confirmItems();
  }
 
  getSumma(){

  }

  clearCart(){
    this.newcartService.clearBasketItems();
  }

  deleteBasketItem(item: BasketItem){
    this.newcartService.deleteBasketItem(item);
  }

  clearNewcart(){
    this.newcartService.clearNewcart();    
  }

  // back

}
