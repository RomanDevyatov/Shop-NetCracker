import { Component, OnInit } from '@angular/core';
import { OrderHistory } from '../entity/orderhistory';
import { OrderHistoryService } from '../_services/order-history.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {

  orderHistorys: OrderHistory[];
  categoryIds: number[];

  
  constructor(  private orderHistoryService: OrderHistoryService, 
                private router: Router,
  ) { }

  ngOnInit():void {    
    this.reloadData();
    console.log(this.orderHistorys);
  }

  reloadData() {
    this.orderHistoryService.getOrderHistorysList().subscribe( (result) => {this.orderHistorys=result;
    console.log("time:", this.orderHistorys[0].date);});     
  }

  getCategoryId(good:OrderHistory){
    return good;
  }

  deleteOrderhist(id: number) {
    this.orderHistoryService.deleteOrderHistory(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }

  updateOrderhist(id: number){
    this.router.navigate(['goods/update', id]);
  }

  getDateDay(d: Date):any{
    return new Date();
  }
  
  orderhistDetails(id: number){
    this.router.navigate(['goods/details', id]);
  }
}
