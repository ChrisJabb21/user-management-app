import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const API_URL_TEST = 'http://localhost:8080/v1/test/';
const API_URL = 'http://localhost:8080/v1/users';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  // getPublicContent(): Observable<any> {
  //   return this.http.get(API_URL + 'all', { responseType: 'text' });
  // }


  // getAdminBoard(): Observable<any> {
  //   return this.http.get(API_URL_TEST + 'admin', {  responseType:'text'});
  // }

  getAll(): Observable<any> {
    return this.http.get(API_URL);
  }

  get(id): Observable<any> {
    return this.http.get(`${API_URL}/${id}`);
  }

  create(data): Observable<any> {
    return this.http.post(API_URL, data);
  }

  update(id, data): Observable<any> {
    return this.http.put(`${API_URL}/${id}`, data);
  }

  delete(id): Observable<any> {
    return this.http.delete(`${API_URL}/${id}`);
  }

  findByUsername(username): Observable<any> {
    return this.http.get(`${API_URL}?username=${username}`);
  }




  


 }
