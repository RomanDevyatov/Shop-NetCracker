import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { CreateUserComponent } from './user/create-user/create-user.component';
import { UpdateUserComponent } from './user/update-user/update-user.component';
import { UserDetailsComponent } from './user/user-details/user-details.component';
import { DiscountListComponent } from './discount/discount-list/discount-list.component';
import { DiscountDetailsComponent } from './discount/discount-details/discount-details.component';
import { UpdateDiscountComponent } from './discount/update-discount/update-discount.component';
import { CreateDiscountComponent } from './discount/create-discount/create-discount.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './account/profile/profile.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { authInterceptorProviders, AuthInterceptor } from './_helpers/auth.interceptor';
import { GoodListComponent } from './good/good-list/good-list.component';
import { CartComponent, FormatTimePipe } from './basket/cart/cart.component';
import { CommonModule } from '@angular/common';
import { GoodDetailsComponent } from './good/good-details/good-details.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { GoodUpdateComponent } from 'src/app/good/good-update/good-update.component';
import { GoodCreateComponent } from './good/good-create/good-create.component';
import { FeedbackListComponent } from './feedback/feedback-list/feedback-list.component';
import { FeedbackCreateComponent } from './feedback/feedback-create/feedback-create.component';
import { DataSharingService } from './_services/data-sharing.service';
import { MyShoppingComponent } from './my-shopping/my-shopping.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { NewcartComponent } from './basket/newcart/newcart.component';
import { ContactTypeListComponent } from './contact-type/contact-type-list/contact-type-list.component';
import { ContactTypeCreateComponent } from './contact-type/contact-type-create/contact-type-create.component';
import { ContactListComponent } from './contact/contact-list/contact-list.component';
import { GoodEditComponent } from './good/good-edit/good-edit.component';
import { ProfileUpdateComponent } from './account/profile-update/profile-update.component';
import { UserService } from './_services/user.service';


@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    CreateUserComponent,
    UpdateUserComponent,
    UserDetailsComponent,
    DiscountListComponent,
    DiscountDetailsComponent,
    UpdateDiscountComponent,
    CreateDiscountComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    BoardAdminComponent,
    BoardUserComponent,
    GoodListComponent,
    CartComponent,
    GoodDetailsComponent,
    OrderHistoryComponent,
    GoodUpdateComponent,
    GoodCreateComponent,
    FeedbackListComponent,
    FeedbackCreateComponent,
    MyShoppingComponent,
    ContactUsComponent,
    NewcartComponent,
    FormatTimePipe,
    ContactTypeListComponent,
    ContactTypeCreateComponent,
    ContactListComponent,
    GoodEditComponent,
    ProfileUpdateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CommonModule,    
    ReactiveFormsModule    
  ],
  providers: [authInterceptorProviders, DataSharingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
