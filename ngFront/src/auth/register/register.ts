import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Country, UserRole } from '../../types';
import { LocationService } from '../../services/location.service';
import { takeUntil } from 'rxjs';

function equalValues(controlName1: string, controlName2: string) {
  return (control: AbstractControl) => {
    const val1 = control.get(controlName1)?.value;
    const val2 = control.get(controlName2)?.value;

    if (val1 === val2) {
      return null;
    }

    return { valuesNotEqual: true };
  };
}

@Component({
  selector: 'gg-register',
  imports: [ReactiveFormsModule, MatSelectModule, MatFormFieldModule, MatInputModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register implements OnInit {
  private readonly snackBar = inject(MatSnackBar);
  private readonly authService = inject(AuthService);
  private readonly locationService = inject(LocationService);
  private destroyRef = inject(DestroyRef);

  countries: Country[] = [];
  cities = [];

  form = new FormGroup({
    firstName: new FormControl('', {
      validators: [Validators.required, Validators.minLength(2)],
    }),
    lastName: new FormControl('', {
      validators: [Validators.required, Validators.minLength(2)],
    }),
    role: new FormControl<UserRole>(UserRole.Jobseeker, {
      validators: Validators.required,
    }),
    age: new FormControl<number | undefined>(undefined, {
      validators: [Validators.required, Validators.min(16), Validators.max(100)],
    }),
    address: new FormGroup({
      country: new FormControl<Country | undefined>(undefined, {
        validators: [Validators.required],
      }),
      city: new FormControl('', {
        validators: [Validators.required],
      }),
    }),
    email: new FormControl('', {
      validators: [Validators.email, Validators.required],
    }),
    passwords: new FormGroup(
      {
        password: new FormControl('', {
          validators: [Validators.required, Validators.minLength(6)],
        }),
        confirmPassword: new FormControl('', {
          validators: [Validators.required, Validators.minLength(6)],
        }),
      },
      {
        validators: [equalValues('password', 'confirmPassword')],
      }
    ),
  });

  ngOnInit(): void {
    this.loadCountries();
    this.subscribeToCountriesChange();
  }

  private async loadCountries() {
    this.countries = await this.locationService.getCountries();
  }

  private async subscribeToCountriesChange() {
    const subscribtion = this.form.get('address.country')?.valueChanges.subscribe((value) => {
      if (value?.name) {
        this.locationService.getCities(value?.countryCode);
      }
    });

    this.destroyRef.onDestroy(() => subscribtion?.unsubscribe());
  }

  onSubmit() {
    this.authService.register(
      this.form.controls.firstName.value!,
      this.form.controls.lastName.value!,
      this.form.controls.age.value!,
      this.form.controls.role.value!,
      this.form.controls.email.value!,
      this.form.controls.passwords.controls.password.value!,
      this.form.controls.address.controls.city.value!,
      0 // this.form.controls.address.controls.country.value!
    );
  }
}
