import { Component, OnInit } from '@angular/core';
import { Feedback } from 'src/app/entity/feedback';
import { FeedbackService } from 'src/app/_services/feedback.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feedback-list',
  templateUrl: './feedback-list.component.html',
  styleUrls: ['./feedback-list.component.css']
})
export class FeedbackListComponent implements OnInit {

  feedbacks: Feedback[]=[];
  private roles: string[];
  showAdminBoard = false;
  showModeratorBoard = false;
  showAnonymousBoard=false;

  constructor(  private feedbackService: FeedbackService,
                private tokenStorageService: TokenStorageService,
                private router: Router,) { }

  ngOnInit(): void {
    this.reloadData();

      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');
      this.showAnonymousBoard = this.roles.includes('ROLE_ANONYMOUS');
  }

  reloadData() {
    this.feedbackService.getFeedbacksList().subscribe( (result) => {this.feedbacks=result;
      console.log(result);
       });  
  }

}
