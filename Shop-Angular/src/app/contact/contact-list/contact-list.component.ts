import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/entity/contact';
import { ContactService } from 'src/app/_services/contact.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

  contacts: Contact[]=[];

  constructor(
    private contactService:ContactService
  ) { }

  ngOnInit(): void {
    this.reloadData();
  }

  reloadData() {
    this.contactService.getContactList().subscribe(
      (result) =>{
        console.log(result);
        this.contacts=result;
      }
    );
  }

  deleteById(id) {
    this.contactService.deleteById(id)
      .subscribe(
        () => {          
          this.reloadData();
        }
      );
  }

}
