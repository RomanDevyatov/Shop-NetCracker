import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './_services/token-storage.service';
import { DataSharingService } from 'src/app/_services/data-sharing.service';
import { CartService } from './_services/cart.service';
import { User } from './entity/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private roles: string[];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  showAnonymousBoard=false;
  username: string;
  title: any[];
  userId: number;

  constructor(  private tokenStorageService: TokenStorageService,
                private dataSharingService: DataSharingService,
                private cartService: CartService,
                private router: Router) {                  
                  this.dataSharingService.isUserLoggedIn.subscribe( 
                    value => {
                      this.isLoggedIn = value;
                      if (this.isLoggedIn) {
                        const user = this.tokenStorageService.getUser();
                        this.roles = user.roles;                  
                        this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
                        this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');
                        this.showAnonymousBoard = this.roles.includes('ROLE_ANONYMOUS');                  
                        this.username = user.username;
                      }
                    }
                  );
                }

  ngOnInit() {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.userId = this.tokenStorageService.getUser().id;
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');
      this.showAnonymousBoard = this.roles.includes('ROLE_ANONYMOUS');

      this.username = user.username;
    }
  }
    
  logout() {    
    this.cartService.clearBasketItemForCurrentUser(this.tokenStorageService.getUser().id).subscribe(
      value =>{        
        
        this.router.navigate(['/home']);
      }
    );
    this.tokenStorageService.signOut();
        window.location.reload();
    
  }
}
