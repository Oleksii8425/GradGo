import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ɵInternalFormsSharedModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'gg-login',
  imports: [ɵInternalFormsSharedModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  constructor(private authService: AuthService, private snackBar: MatSnackBar) {}

  form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.email, Validators.required],
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6)],
    }),
  });

  onSubmit() {
    const email = this.form.controls.email.value!;
    const password = this.form.controls.password.value!;
    this.authService.login(email, password).subscribe((data) => {
      if (data.status !== 'Ok') {
        this.snackBar.open(data.status, 'Ok');
      }
    });
  }
}
