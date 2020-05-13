import { Component, OnInit } from '@angular/core';
import { GoodService } from 'src/app/_services/good.service';
import { Good } from 'src/app/entity/good';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-good-update',
  templateUrl: './good-update.component.html',
  styleUrls: ['./good-update.component.css']
})
export class GoodUpdateComponent implements OnInit {
  ReactForm: FormGroup;
  form: any = {};
  id: number;
  good: Good;
  errorMessage = '';
  constructor(  
                private fb: FormBuilder,
                private route: ActivatedRoute,
                private goodService: GoodService,
                private router: Router) { }

  ngOnInit(): void {    
    this.good = new Good();
    this.id=this.route.snapshot.params['id'];
    this.goodService.getGood(this.id)
      .subscribe(
        (data) =>{
          console.log('id', this.id, 'data: ', data)
          this.good=data;
          this.initForm();
        }
      );
  }

  initForm(){
    this.ReactForm = this.fb.group({
     name: [this.good.name],
     brand: [this.good.brand],
     amount: [this.good.amount],
     categoryName: [this.good.categoryName],
     size: [this.good.size],
     price: [this.good.price],
     imgPath: [this.good.imgPath]
    });
   }

  onSubmit(){ 
   console.log(this.ReactForm.value);
   this.goodService.updateGood(this.id, this.ReactForm.value)
      .subscribe(
        () => {
          this.good = new Good();
          this.gotoList();
        } 
      );    
  }

  updateGood() {
    this.goodService.updateGood(this.id, this.form)
      .subscribe(
        data => 
          console.log(data), 
        error => 
          console.log(error));
    this.good = new Good();
    this.gotoList();
  }

  reloadPage() {
    window.location.reload();
  }

  gotoList() {
    this.router.navigate(['/goods']);
  }

}
