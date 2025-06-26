import { Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { tap } from 'rxjs';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    if (this.loginForm.invalid) {
      console.log(this.loginForm.value);
      return;
    }
    const form = this.loginForm.value;
    this.authService
      .login({
        email: form.email,
        hashed_password: form.password,
      })
      .pipe(
        tap((response) => {
          // Authorization
          const token = response.headers.get('Authorization');
          this.sharedService.setUserToken(token);
        })
      )
      .subscribe({
        next: (response) => {
          this.sharedService.showToast({
            classname: 'success',
            text: 'Login successful!',
          });
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          this.sharedService.showToast({
            classname: 'error',
            text: err?.error?.message,
          });
        },
      });
  }
}
