import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { Subject } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnDestroy {
  content: string;
  private destroy$ = new Subject<undefined>();

  constructor(  private userService: UserService,
                private route: ActivatedRoute) {
                  this.route.params.pipe(
                    takeUntil(this.destroy$)
                ).subscribe((params: Params) => {
                  this.userService.getPublicContent().subscribe(
                    data => {
                      this.content = data;
                    },
                    err => {
                      this.content = JSON.parse(err.error).message;
                    }
                  );
                });                
              }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // ngOnInit() {
  //   this.userService.getPublicContent().subscribe(
  //     data => {
  //       this.content = data;
  //     },
  //     err => {
  //       this.content = JSON.parse(err.error).message;
  //     }
  //   );
  // }
}