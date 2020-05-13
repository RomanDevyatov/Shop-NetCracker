import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/entity/user';
import { Route } from '@angular/compiler/src/core';
import { UserService } from 'src/app/_services/user.service';
import { ContactService } from 'src/app/_services/contact.service';
import { Contact } from 'src/app/entity/contact';
import { ContactType } from 'src/app/entity/contactType';

@Component({
  selector: 'app-profile-update',
  templateUrl: './profile-update.component.html',
  styleUrls: ['./profile-update.component.css']
})
export class ProfileUpdateComponent implements OnInit {
  
  //typeForm : FormGroup;
  //ReactForm: FormGroup;
  ReactForm = this.fb.group({
    username: [''],
    firstName: [''],
    lastName: [''],
    email: [''],
    categoryName: [''],     
    password: [],
    birthDate: [''],   
    discount:[''],
    contactTypeValues: this.fb.array([])   
  });
  user:User={id:null,email:"", firstName:"", lastName:"", categoryName:"", password:"", birthDate:null, username:"", discount:null};
  id: number;
  contacts:Contact[]=[];
  value: string[]=[];
    
  
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private contactService: ContactService
  ) { }

  ngOnInit(): void {       
    this.user = new User();
    this.id=this.route.snapshot.params['id'];
    this.userService.getUser(this.id)
      .subscribe(
        (data) =>{
          this.user=data;   
          console.log("user:", data);       
          this.contactService.getContactListForCurrentUser(this.id).subscribe(
            (res) =>{
              this.contacts=res;
              this.initForm();
            }
          )          
        }
      );
  }

  initContactTypeValueArray(){
    for(let i=0; i<this.contacts.length;i++){
      this.addContactTypeValueField(this.contacts[i].value);      
    }
  }

  initForm(){
    this.ReactForm = this.fb.group({
      username: [this.user.username],
      firstName: [this.user.firstName],
      lastName: [this.user.lastName],
      email: [this.user.email],
      categoryName: [this.user.categoryName],     
      password: [],
      birthDate: [this.user.birthDate],   
      discount: [this.user.discount],
      contactTypeValues: this.fb.array([])   
    });
    this.initContactTypeValueArray();
   }
   
  onSubmit(){         
    for(let i = 0; i < this.contactTypeValues.length; i++) {     
      this.contacts[i].value=this.contactTypeValues.at(i).value;       
    } 
   this.userService.updateUser(this.id, this.ReactForm.value)
      .subscribe(
        () => {          
          this.contactService.updateContact(this.id, this.contacts).subscribe(
            () =>{                
              this.goToProfile();
            }
          )          
        } 
      );    
  }

  goToProfile() {
    this.router.navigate(['/profile']);
  }

  get contactTypeValues(): FormArray { 
    return this.ReactForm.get('contactTypeValues') as FormArray; 
  }

  addContactTypeValueField(str) { 
    this.contactTypeValues.push(this.fb.control(str));//push(new FormControl(str)); 
  }
  
  setValueTypeForm(){
  }

  deleteContactTypeValueField(index: number) {
    this.contactTypeValues.removeAt(index);
  }

  

}
