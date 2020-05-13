import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Feedback } from '../entity/feedback';

const FEEDBACK_API = 'http://localhost:8080/api/feedbacks/add';
  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  idProduct:number;
  private baseUrl  = 'http://localhost:8080/api/feedbacks/add';
  private baseUrl1 = 'http://localhost:8080/api/feedbacks';
  private baseUrl2 = 'http://localhost:8080/api';
  private baseUrl3 = 'feedbacks';
  private baseUrl4 = 'http://localhost:8080/api/feedbacks/deleteByGoodId';
  private baseUrl5 = 'http://localhost:8080/api/feedbacks/deleteByUserIdAndDate';

  constructor( private http: HttpClient) { }

  setIdProduct(idProduct){
    this.idProduct=idProduct;
  }

  getIdProductFeed():any{
    return this.idProduct;
  }

  public registerFeed(feedback: Feedback){
    this.http.post(this.baseUrl, feedback, httpOptions).subscribe(
      (data) => { // Success
        console.log(data)
      },
      (error) => {
        console.error("Error: " + JSON.stringify(error));
      }
    );
  }

  deleteFeedback(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl1}/${id}`, { responseType: 'text' });
  }
  
  deleteFeedbackByGoodId(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl4}/${id}`, { responseType: 'text' });
  }

  deleteFeedbackByUserIdAndDate(userid: number, date:string): Observable<any> {
    return this.http.delete(`${this.baseUrl5}/${userid}`, { responseType: 'text' });
  }

  public getFeedbacksForGood(id: number):Observable<any>{
    return this.http.get(`${this.baseUrl2}/${id}/${this.baseUrl3}`);
  }

  public getFeedbacksList(): Observable<any>{
    return this.http.get(`${this.baseUrl1}`);
  } 
}
