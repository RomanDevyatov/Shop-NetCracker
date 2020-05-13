import { Component, OnInit } from '@angular/core';
import { Discount } from 'src/app/entity/discount';
import { Router } from '@angular/router';
import { DiscountService } from 'src/app/_services/discount.service';

@Component({
  selector: 'app-create-discount',
  templateUrl: './create-discount.component.html',
  styleUrls: ['./create-discount.component.css']
})
export class CreateDiscountComponent implements OnInit {

  discount: Discount = new Discount();
  submitted = false;

  constructor(  private discountService: DiscountService,
                private router: Router) { }

  ngOnInit(): void {
  }

  newDiscount(): void {
    this.submitted = false;
    this.discount = new Discount();
  }

  save() {
    this.discountService.createDiscount(this.discount)
      .subscribe(data => console.log(data), error => console.log(error));
    this.discount = new Discount();
    this.gotoList();
  }

  onSubmit() {
    this.submitted = true;
    this.save();    
  }

  gotoList() {
    this.router.navigate(['/discounts']);
  }
}
