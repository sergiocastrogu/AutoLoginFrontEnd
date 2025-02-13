import { LoginResponse } from './../../core/models/LoginResponse';
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginModelRequest } from 'src/app/core/models/loginRequest.model';
import { UserRepository } from './../../core/repositories/login.repository';
import { Observable } from 'rxjs';

@Injectable()
export class UserService implements UserRepository {
  http: HttpClient = inject(HttpClient);

  apiUri = 'https://localhost:62474/api/user';

  login(request: LoginModelRequest): Observable<any>{
    return this.http.post(this.apiUri + '/login', request);
  }
  register(request: any): Observable<any> {
    return this.http.post(this.apiUri + '/register', request);
  }
  userData(): Observable<any> {
    let userData: LoginResponse = JSON.parse(sessionStorage.getItem('user') || '');
    console.log(userData);
    return this.http.get(this.apiUri + '/getUserData', {headers: {'Authorization': 'Bearer '+ userData.token}});
  }
}
