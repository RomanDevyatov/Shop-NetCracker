import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../entity/user';
import { UserService } from '../../_services/user.service';
import { Router } from '@angular/router';
import { UserDetailsComponent } from './../user-details/user-details.component';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: Observable<User[]>;
  private roles: string[];
  showAdminBoard = false;
  showModeratorBoard = false;
  showAnonymousBoard=false;

  constructor(  private userService: UserService, 
                private tokenStorageService: TokenStorageService,
                private router: Router) { }

  ngOnInit():void {
    this.reloadData();

    const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');
      this.showAnonymousBoard = this.roles.includes('ROLE_ANONYMOUS');
  }

  reloadData() {
    this.users = this.userService.getUsersList();
    console.log(this.users);
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }

  updateUser(id: number){
    this.router.navigate(['users/update', id]);
  }

  userDetails(id: number){
    this.router.navigate(['users/details', id]);
  }

   
  

}
