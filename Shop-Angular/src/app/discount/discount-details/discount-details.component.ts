import { Component, OnInit } from '@angular/core';
import { Discount } from 'src/app/entity/discount';
import { DiscountService } from 'src/app/_services/discount.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-discount-details',
  templateUrl: './discount-details.component.html',
  styleUrls: ['./discount-details.component.css']
})
export class DiscountDetailsComponent implements OnInit {

  id: number;
  discount: Discount;

  constructor(  private route: ActivatedRoute,
                private router: Router,
                private discountService: DiscountService) { }

  ngOnInit(): void {
    this.discount=new Discount();

    this.id=this.route.snapshot.params['id'];

    this.discountService.getDiscount(this.id)
      .subscribe(data => {
        console.log(data)
        this.discount=data;
      }, error=>console.log(error));
  }

  list(){
    this.router.navigate(['discounts']);
  }

}
