import { HttpClient, JsonpClientBackend } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/common/services/http.service';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { UserInfo } from '../models/userInfo';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl: string = `${environment.apiUrl}/api/user`;
  private loggedUser!: UserInfo;
  constructor(private http: HttpService) {}

  async authenticate(user: User): Promise<UserInfo> {
    const url: string = `${this.apiUrl}/authenticate`;
    const loggedUser = await this.http.fetchPost<UserInfo>(url, user);
    this.loggedUser = loggedUser;
    localStorage.setItem('user', JSON.stringify(this.loggedUser));
    return this.loggedUser;
  }

  getLoggedUser(): UserInfo | null {
    const user = localStorage.getItem('user');
    if (user != null) {
      return <UserInfo>JSON.parse(user);
    }
    return null;
  }
}
