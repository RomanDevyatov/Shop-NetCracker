import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { User } from '../entity/user';
import { Router } from '@angular/router';
import { DataSharingService } from '../_services/data-sharing.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: any = {};
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  isLoggedIn = false;
  isLoginFailed = false;
  roles: string[] = [];
  login:string;
  password:string;
  loginForm: any = {};

  constructor(  private router: Router, 
                private authService: AuthService,
                private dataSharingService: DataSharingService,
                private tokenStorage: TokenStorageService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.authService.register(this.form).subscribe(
      data => {
        console.log('data', data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.loginForm.username=this.form.username;
        this.loginForm.password=this.form.password;
        this.authService.login(this.loginForm).subscribe(
          data => {
            this.tokenStorage.saveToken(data.accessToken);
            this.tokenStorage.saveUser(data);
            this.isLoginFailed = false;
            this.dataSharingService.isUserLoggedIn.next(true);
            this.roles = this.tokenStorage.getUser().roles;

            this.router.navigate(['home']);                
          }
        );
        //this.router.navigate(['/']); 
        //router
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }


}