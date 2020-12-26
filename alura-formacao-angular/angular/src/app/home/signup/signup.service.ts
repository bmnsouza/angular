import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

import { NewUser } from './new-user';

const SERVER_API_URL = environment.serverApiUrl;

@Injectable()
export class SignUpService {

  constructor(private http: HttpClient) { }

  checkUserNameTaken(userName: string) {
    return this.http.get(`${SERVER_API_URL}/user/exists/${userName}`);
  }

  signup(newUser: NewUser) {
    return this.http.post(`${SERVER_API_URL}/user/signup`, newUser);
  }
}