import { Component, OnInit } from '@angular/core';
import { OrderHistory } from '../entity/orderhistory';
import { OrderHistoryService } from '../_services/order-history.service';
import { Router } from '@angular/router';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-my-shopping',
  templateUrl: './my-shopping.component.html',
  styleUrls: ['./my-shopping.component.css']
})
export class MyShoppingComponent implements OnInit {

  myShoppingHistory: OrderHistory[];  

  constructor(  private tokenStorageService: TokenStorageService,
                private orderHistoryService: OrderHistoryService, 
                private router: Router
    ) { }

  ngOnInit(): void {
    this.reloadData();
    
  }

  isEmpty(): boolean{
    return this.myShoppingHistory.length===0;
  }

  reloadData() {
    this.orderHistoryService.getOrderHistorysListForCurrentUser(this.tokenStorageService.getUser().id).subscribe( 
      (result) => {        
        this.myShoppingHistory=result;
        console.log("zdes: ",this.myShoppingHistory);
      }
    );     
  }

}
