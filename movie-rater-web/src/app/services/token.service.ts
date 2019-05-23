import { Token } from './../models/userToken';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  baseUrl: string = environment.apiUrl;
  constructor(private http:HttpClient) { }

  getToken(): Observable<any> {
    return this.http.get(this.baseUrl + 'tokens/', this.getAuthHeaders());

  }

  removeToken(userToken: any):Observable<any> {
    return this.http.delete(this.baseUrl + 'tokens/' + userToken +'/',this.getAuthHeaders());

  }

  private getAuthHeaders(){
    const token = localStorage.getItem('token');
    const httpHeaders = new HttpHeaders(
      {'Content-Type': 'application/json; charset=utf-8', 'Authorization': 'Token ' + token});
      return { headers: httpHeaders};
  }
}
