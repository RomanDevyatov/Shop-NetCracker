import { Component, OnInit } from '@angular/core';

import { TokenStorageService } from '../../_services/token-storage.service';
import { User } from '../../entity/user';
import { UserService } from '../../_services/user.service';
import { Router } from '@angular/router';
import { ContactService } from 'src/app/_services/contact.service';
import { Contact } from 'src/app/entity/contact';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: any;
  fullUser: User={id:null,email:"", firstName:"", lastName:"", categoryName:"", password:"", birthDate:null, username:"", discount:null};
  contacts: Contact[]=[]; 
  
  constructor(private token: TokenStorageService,
              private userService: UserService,
              private router: Router,
              private contactService: ContactService) { }

  ngOnInit() {
    this.currentUser = this.token.getUser();
    this.userService.getUser(this.currentUser.id).subscribe(
      (result)=>{
        this.fullUser=result;
        console.log(result);
        this.contactService.getContactListForCurrentUser(this.currentUser.id).subscribe(
          (res)=>{
            this.contacts=res;
          }
        );
      }
    );
  }

  updateProfile(){
    this.router.navigate(['profile/edit', this.currentUser.id]);
  }

  isStringFieldNull(str): boolean{
    return str===null;
  }

  isValueNull(item): boolean{
    console.log("hm:",item);
    return item==="";
  }

  isDiscNull(): boolean{
    return this.fullUser.discount===null;
  }

  isContactValueNull(contacts): boolean{
    let cnt=0;
    for(let i=0;i<contacts.length; i++){
      if(!(contacts[i].value==="")){
        cnt++;
      }
    }
    if(cnt===0){
      return true;
    }
    else false;

  }
  isNull(item): boolean{
    return item.value===null;
  }
}