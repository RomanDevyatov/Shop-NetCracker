import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {
  public isUserLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isAddedProduct: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public hasAmountChanged: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
}
