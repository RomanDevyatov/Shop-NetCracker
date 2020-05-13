import { Component, OnInit } from '@angular/core';
import { ContactType } from 'src/app/entity/contactType';
import { ContactTypeService } from 'src/app/_services/contact-type.service';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-contact-type-list',
  templateUrl: './contact-type-list.component.html',
  styleUrls: ['./contact-type-list.component.css']
})
export class ContactTypeListComponent implements OnInit {

  contactTypes: ContactType[]=[];
  private roles: string[];
  showAdminBoard = false;
  showModeratorBoard = false;
  showAnonymousBoard=false;
  hasAmountChanged=false;
  newTypeName:string;

  constructor(
    private contactTypeService: ContactTypeService,
    private router: Router,
    private tokenStorageService: TokenStorageService
  ) { }

  ngOnInit(): void {
    this.reloadData();

      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');
      this.showAnonymousBoard = this.roles.includes('ROLE_ANONYMOUS');
  }

  reloadData() {
    this.contactTypeService.getContactTypeList().subscribe(
      (result) => {
        console.log(result);
        this.contactTypes=result;
      }
    );
  }

  addContactType(){
    this.contactTypeService.registerContactType(this.newTypeName).subscribe(
      ()=>{
        this.reloadData();
      }
    );
  }

  deleteById(id) {
    console.log('contactType.id', id);
    this.contactTypeService.deleteById(id)
      .subscribe(
        () => {          
          this.reloadData();
        }
      );
  }

}



