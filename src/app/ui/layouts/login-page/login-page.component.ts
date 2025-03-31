import { Component } from '@angular/core';
import { AuthService } from '../../../data/auth/auth.service';
import { InputComponent } from '../../shared/input/input.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AutofocusDirective } from '../../../shared/directives/autofocus.directive';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-login-page',
  imports: [InputComponent, ReactiveFormsModule, AutofocusDirective, NgClass],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
})
export class LoginPageComponent {
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', []),
  });

  constructor(private authService: AuthService) {}

  submit() {
    if (this.form.valid) {
      let {email, password = ''} = this.form.value
      console.log('Form Submitted:', );
      this.authService.login({ email: email || '', password: password || ''}).subscribe();
    }
  }

  login(email: string, password: string): void {
    
  }
}
