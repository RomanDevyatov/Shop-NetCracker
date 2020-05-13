import { Component, OnInit } from '@angular/core';
import { Discount } from 'src/app/entity/discount';
import { ActivatedRoute, Router } from '@angular/router';
import { DiscountService } from 'src/app/_services/discount.service';

@Component({
  selector: 'app-update-discount',
  templateUrl: './update-discount.component.html',
  styleUrls: ['./update-discount.component.css']
})
export class UpdateDiscountComponent implements OnInit {
  id: number;
  discount: Discount;
  submitted = false;

  constructor(private route: ActivatedRoute, 
              private router: Router,
              private discountService: DiscountService) { }

  ngOnInit(): void {
    this.discount = new Discount();

    this.id=this.route.snapshot.params['id'];

    this.discountService.getDiscount(this.id)
      .subscribe(data =>{
        console.log(data)
        this.discount=data;
      }, error => console.log(error));
  }

  updateDiscount() {
    this.discountService.updateDiscount(this.id, this.discount)
      .subscribe(data => console.log(data), error => console.log(error));
    this.discount = new Discount();
    this.gotoList();
  }

  onSubmit() {
    this.submitted = true;
    this.updateDiscount();    
  }

  gotoList() {
    this.router.navigate(['/discounts']);
  }
}
