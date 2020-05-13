import { Component, OnInit } from '@angular/core';
import { GoodService } from 'src/app/_services/good.service';

@Component({
  selector: 'app-good-create',
  templateUrl: './good-create.component.html',
  styleUrls: ['./good-create.component.css']
})
export class GoodCreateComponent implements OnInit {
  form: any = {};
  myFiles:string [] = [];
  fileData: File = null;
  constructor(  private goodService: GoodService) { }

  ngOnInit(): void {
    
  }

  fileProgress(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
}

  onSubmit(){     
    this.form.imgPath="assets/img/nopic.png";
    
    this.goodService.registerGood(this.form).subscribe(
      data => {
        console.log('data', data);
      }
    );

    
    
  }

  onFileChange(event) {   

    for (var i = 0; i < event.target.files.length; i++) { 
        this.myFiles.push(event.target.files[i]);
    }
  }
}
