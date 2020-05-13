import { Component, OnInit } from '@angular/core';
import { Discount } from '../../entity/discount';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/_services/user.service';
import { Router } from '@angular/router';
import { DiscountService } from 'src/app/_services/discount.service';

@Component({
  selector: 'app-discount-list',
  templateUrl: './discount-list.component.html',
  styleUrls: ['./discount-list.component.css']
})
export class DiscountListComponent implements OnInit {

  discounts: Observable<Discount[]>;

  constructor(private discountService: DiscountService,
    private router: Router) { }

  ngOnInit(): void {
    this.reloadData();
  }

  reloadData() {
    this.discounts = this.discountService.getDiscountsList();
  }

  deleteDiscount(id: number) {
    this.discountService.deleteDiscount(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }

  updateDiscount(id: number){
    this.router.navigate(['discounts/update', id]);
  }

  discountDetails(id: number){
    this.router.navigate(['discounts/details', id]);
  }

}
