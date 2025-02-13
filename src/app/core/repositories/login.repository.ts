import { Observable } from 'rxjs';
import { LoginModelRequest } from './../models/loginRequest.model';
import { ResponseBase } from '../models/responseBase';
import { LoginResponse } from '../models/LoginResponse';


export abstract class UserRepository{
    abstract login(request: LoginModelRequest): Observable<ResponseBase<LoginResponse>>;
    abstract register(request: any): Observable<ResponseBase<any>>;
    abstract userData(): Observable<ResponseBase<LoginResponse>>;

}
