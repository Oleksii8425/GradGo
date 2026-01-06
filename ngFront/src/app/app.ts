import { Component, signal } from '@angular/core';
import { Register } from "../auth/register/register";
import { Login } from '../auth/login/login';

@Component({
  selector: 'app-root',
  imports: [Register],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('Grad Go');
}
