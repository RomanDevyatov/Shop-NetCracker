import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const CONTACT_TYPE_API = 'http://localhost:8080/api/contacts/type/create';
  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
@Injectable({
  providedIn: 'root'
})
export class ContactTypeService {
  
  private baseUrl = 'http://localhost:8080/api/contacts/type';
  constructor(
    private http: HttpClient
  ) { }

  getContactTypeList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }  

  public registerContactType(contactType): Observable<any> {
    return this.http.post(CONTACT_TYPE_API , {
      name: contactType
    }, httpOptions);
  }

  deleteById(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }
  
}
