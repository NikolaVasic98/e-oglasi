import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { User } from '../../models/user';
import { UserInfo } from '../../models/userInfo';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loggedUser: UserInfo | null | undefined;

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.buildForm();
    this.loggedUser = this.userService.getLoggedUser();
  }

  ngOnInit(): void {}

  buildForm(): void {
    this.loginForm = this.fb.group({
      username: [''],
      password: [''],
    });
  }

  onLogin() {
    const user: User = new User(
      this.loginForm.value.username,
      this.loginForm.value.password
    );
    this.userService.authenticate(user).then((user) => {
      this.loggedUser = user;
    });
  }
}
