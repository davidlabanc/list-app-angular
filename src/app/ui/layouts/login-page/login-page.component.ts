import { Component } from '@angular/core';
import {AuthService} from '../../../data/auth/auth.service'

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
})
export class LoginPageComponent {
  constructor(private authService: AuthService){}

  add(email: string, password: string): void {
    console.log(email, "password: ", password)
  }
}
