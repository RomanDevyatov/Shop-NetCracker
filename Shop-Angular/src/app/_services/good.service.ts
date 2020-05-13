import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Good } from '../entity/good';


const GOOD_API = 'http://localhost:8080/api/goods';
  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
// const httpOptions = {
//   headers: new HttpHeaders({  'Access-Control-Allow-Origin' : '*' })
// };
@Injectable({
  providedIn: 'root'
})
export class GoodService {

  private baseUrl = 'http://localhost:8080/api/goods';
  private baseUrl1 = 'http://localhost:8080/api/goods/amount';
  private baseUrl2 = 'http://localhost:8080/api/goods/byname';
  private baseUrl3 = 'http://localhost:8080/api/goods';
  private baseUrl4 = 'http://localhost:8080/api/goods/createImg';
  constructor(private http: HttpClient) { }

  getGood(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  getGoodByName(name: any): Observable<any> {
    return this.http.post(`${this.baseUrl2}`, name);
  }

  getGoodsList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }  

  createImg(value): Observable<any> {
    return this.http.post(`${this.baseUrl4}`, value);
  }

  deleteGood(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  public updateGood(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  public updateGoodAmount(id: number, value: any): Observable<any> {
    return this.http.post(`${this.baseUrl1}/${id}`, value);
  }

  public getAmountByGoodId(id: number): Observable<any>{
    return this.http.get(`${this.baseUrl3}/${id}`);
  }
  
  public registerGood(good):Observable<any> {
    return this.http.post(GOOD_API , {
      name: good.name,
      brand: good.brand,
      amount: good.amount,
      categoryName: good.categoryName,
      size: good.size,
      price: good.price,    
      imgPath:good.imgPath
    }, httpOptions);
  }
}
