import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent } from './user/user-list/user-list.component';
import { CreateUserComponent } from 'src/app/user/create-user/create-user.component';
import { UpdateUserComponent } from './user/update-user/update-user.component';
import { UserDetailsComponent } from './user/user-details/user-details.component';
import { DiscountListComponent } from './discount/discount-list/discount-list.component';
import { DiscountDetailsComponent } from './discount/discount-details/discount-details.component';
import { UpdateDiscountComponent } from './discount/update-discount/update-discount.component';
import { CreateDiscountComponent } from 'src/app/discount/create-discount/create-discount.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './account/profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { GoodListComponent } from './good/good-list/good-list.component';
import { CartComponent } from './basket/cart/cart.component';
import { GoodDetailsComponent } from './good/good-details/good-details.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { GoodUpdateComponent } from './good/good-update/good-update.component';
import { GoodCreateComponent } from './good/good-create/good-create.component';
import { FeedbackListComponent } from './feedback/feedback-list/feedback-list.component';
import { FeedbackCreateComponent } from './feedback/feedback-create/feedback-create.component';
import { MyShoppingComponent } from './my-shopping/my-shopping.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { NewcartComponent } from './basket/newcart/newcart.component';
import { ContactTypeListComponent } from './contact-type/contact-type-list/contact-type-list.component';
import { ContactListComponent } from './contact/contact-list/contact-list.component';
import { ProfileUpdateComponent } from './account/profile-update/profile-update.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'users', component: UserListComponent },
  { path: 'users/add', component: CreateUserComponent },
  { path: 'users/update/:id', component: UpdateUserComponent },
  { path: 'users/details/:id', component: UserDetailsComponent },
  { path: 'discounts', component: DiscountListComponent},
  { path: 'discounts/add', component: CreateDiscountComponent },
  { path: 'discounts/update/:id', component: UpdateDiscountComponent },
  { path: 'discounts/details/:id', component: DiscountDetailsComponent },
  // { path: 'loginPage', component: LoginUserComponent },
  // { path: 'logout', component: LoginUserComponent},
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'user', component: BoardUserComponent },
  //{ path: 'mod', component: BoardModeratorComponent },
  { path: 'admin', component: BoardAdminComponent },
  { path: 'goods', component: GoodListComponent},
  { path: 'goods/details/:id', component: GoodDetailsComponent},
  { path: 'cart', component: CartComponent},
  { path: 'orderHistorys', component: OrderHistoryComponent},
  { path: 'goods/update/:id', component: GoodUpdateComponent},
  { path: 'goods/create', component: GoodCreateComponent},
  { path: 'feedbacks/add', component: FeedbackCreateComponent},
  { path: 'feedbacks', component: FeedbackListComponent},
  { path: 'my-shopping', component: MyShoppingComponent},
  { path: 'contact-us', component: ContactUsComponent},
  { path: 'newcart', component: NewcartComponent},
  { path: 'contacts/type', component: ContactTypeListComponent},
  { path: 'contacts', component: ContactListComponent},
  { path: 'profile/edit/:id', component: ProfileUpdateComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
