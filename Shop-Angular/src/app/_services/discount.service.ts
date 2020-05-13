import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DiscountService {

  private baseUrl = 'http://localhost:8080/api/discounts';

  constructor(private http: HttpClient) { }

  getDiscount(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createDiscount(discount: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, discount);
  }

  updateDiscount(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  deleteDiscount(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  getDiscountsList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

}
