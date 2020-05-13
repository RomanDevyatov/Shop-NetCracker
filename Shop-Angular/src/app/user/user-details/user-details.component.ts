import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/entity/user';
import { UserService } from 'src/app/_services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  id: number;
  user: User;

  constructor(private route: ActivatedRoute,private router: Router,
    private userService: UserService) { }

  ngOnInit(): void {
    this.user=new User();

    this.id=this.route.snapshot.params['id'];

    this.userService.getUser(this.id)
      .subscribe(data => {
        console.log(data)
        this.user=data;
      }, error=>console.log(error));
  }

  list(){
    this.router.navigate(['users']);
  }

}
