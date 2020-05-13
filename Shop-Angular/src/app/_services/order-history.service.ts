import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderHistoryService {

  private baseUrl = 'http://localhost:8080/api/orderhistorys';
  private baseUrl2 = 'http://localhost:8080/api/orderhistorys/personal';

  constructor(private http: HttpClient) { }

  getOrderHistory(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  getOrderHistorysList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  getOrderHistorysListForCurrentUser(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl2}/${id}`);
  }

  deleteOrderHistory(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }
}
