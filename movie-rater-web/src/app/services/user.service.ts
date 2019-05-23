import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // httpHeaders = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
  baseUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }


  
loginUser(userData: any): Observable<any> {
    return this.http.post(this.baseUrl + 'login/', userData, this.getAuthHeaders());

  }

  removeToken(usertoken: any):Observable<any> {
    return this.http.delete(this.baseUrl + 'movie/' + usertoken + '/' , this.getAuthHeaders());

  }

  private getAuthHeaders(){
    const token = localStorage.getItem('token');
    const httpHeaders = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8', 'Authorization': 'Token ' + token});
    return {headers:httpHeaders};
  }

  superAdminCustomertable(){
    return this.http.get(this.baseUrl + 'customers/', this.getAuthHeaders());
  }
}