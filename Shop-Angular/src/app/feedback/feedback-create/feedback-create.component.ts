import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { Feedback } from 'src/app/entity/feedback';
import { User } from 'src/app/entity/user';
import { UserService } from 'src/app/_services/user.service';
import { FeedbackService } from 'src/app/_services/feedback.service';
import { GoodService } from 'src/app/_services/good.service';
import { Good } from 'src/app/entity/good';
import {FormGroup, FormControl, Validators}  from '@angular/forms';


@Component({
  selector: 'app-feedback-create',
  templateUrl: './feedback-create.component.html',
  styleUrls: ['./feedback-create.component.css']
})
export class FeedbackCreateComponent implements OnInit {

  feed= new Feedback();
  text:string;
  user=new User();
  goodFeed= new Good();

  date; //date Variable
  logedInForm; //These are variables
  emailId;
  password;
  display='none'; //default Variable
  
  constructor(  private tokenStorageService: TokenStorageService,
                private userService: UserService,
                private feedbackService: FeedbackService,
                private goodService: GoodService) { }

  ngOnInit(): void {
    this.date = new Date(); // Today date and time
    //Login Validation
    this.logedInForm = new FormGroup({
      emailId: new FormControl("youremail@gmail.com",
        Validators.compose([
          Validators.required,
          Validators.pattern("[^ @]*@[^ @]*")
      ])),
      password: new FormControl('YourPassword', [
           Validators.minLength(8),
           Validators.required])
    });
  }

  addFeedback(txt){
    this.user=this.tokenStorageService.getUser();
    this.userService.getUser(this.user.id).subscribe( (result) => {
      this.user=result;//got needed user 
      //user
      this.feed.user=this.user;
      //date
      let todayDate=new Date();        
      this.feed.date=( todayDate.getDate()+ '-' + ((todayDate.getMonth() + 1)) + '-' + todayDate.getFullYear() + ' ' +todayDate.getHours() + ':' + todayDate.getMinutes()+ ':' + todayDate.getSeconds());
      //text
      this.feed.text=txt;
      //good
      console.log('продукт id:', this.feedbackService.getIdProductFeed())
      this.goodService.getGood(this.feedbackService.getIdProductFeed()).subscribe(
        (result) =>{
          this.feed.good=result;          
          console.log('отправляю:', this.feed);
          this.feedbackService.registerFeed(this.feed);
        }
      );
      

      
      });
    
  }

  mdfLogin(data) {
    this.emailId = data.emailId;
    this.password = data.password;
    alert(JSON.stringify(data));
  }

  openModalDialog(){
    this.display='block'; //Set block css
 }

 closeModalDialog(){
  this.display='none'; //set none css after close dialog
 }

}
