import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { Router } from '@angular/router';
import { DataSharingService } from '../_services/data-sharing.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(  private authService: AuthService, 
                private tokenStorage: TokenStorageService,
                private router: Router,
                private dataSharingService: DataSharingService) { }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }

  async onSubmit() {
    await this.authService.login(this.form).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);
        this.isLoginFailed = false;
        this.dataSharingService.isUserLoggedIn.next(true);
        //this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;

        this.router.navigate(['home']);          
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  getRole(){
    return this.roles;
  }

  reloadPage() {
    window.location.reload();
  }
}