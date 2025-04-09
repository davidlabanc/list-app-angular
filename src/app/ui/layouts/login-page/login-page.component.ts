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
import { NgFor, NgIf } from '@angular/common';
import { ApiError } from '../../../errors/api-error';
import { ApiErrorMessage } from '../../../interfaces/api-error';
import { finalize } from 'rxjs';
import { Router } from '@angular/router';
import { FormButtonComponent } from '../../shared/form-button/form-button.component';

@Component({
  selector: 'app-login-page',
  imports: [
    InputComponent,
    ReactiveFormsModule,
    AutofocusDirective,
    NgFor,
    NgIf,
    FormButtonComponent
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
})
export class LoginPageComponent {
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', []),
  });

  errorData: any = [];
  loading: boolean = false;

  constructor(private authService: AuthService, private router: Router) {
    this.submit = this.submit.bind(this);
  }

  submit() {
    console.log('Button clicked', this.form);
    if (this.form.valid) {
      this.loading = true;
      let { email, password = '' } = this.form.value;

      // console.log('Form Submitted:');

      this.authService
        .login({ email: email || '', password: password || '' })
        .pipe(finalize(() => (this.loading = false)))
        .subscribe({
          next: () =>  this.router.navigate(['/dashboard']),
          error: (error: ApiError<ApiErrorMessage[]>) => {
            // console.log('Status:', error.status);
            // console.log('Error Data:', error.errorData);
            // console.log('Error:', error);
            this.errorData = error.errorData;
          },
        });
    }
  }
}
