import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


const CONTACT_TYPE_API = 'http://localhost:8080/api/contacts/create';
  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
@Injectable({
  providedIn: 'root'
})
export class ContactService {
    
  private baseUrl = 'http://localhost:8080/api/contacts';

  constructor(
    private http: HttpClient) { }

  getContactList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }  

  updateContact(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  deleteById(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  getContactListForCurrentUser(id: number):Observable<any>{
    return this.http.get(`${this.baseUrl}/${id}`);
  }
}
