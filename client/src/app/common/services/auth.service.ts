import { Injectable } from '@angular/core';
import { UserInfo } from 'src/app/user/models/userInfo';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  getToken(): string {
    const user = localStorage.getItem('user');
    let token: string = '';
    if (user != null) {
      token = (<UserInfo>JSON.parse(user)).token;
    }
    return token;
  }
}
