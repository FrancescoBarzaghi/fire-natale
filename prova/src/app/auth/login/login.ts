import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth-service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthCardComponent } from '../auth-card/auth-card';

@Component({
  selector: 'app-login',
  imports: [FormsModule,CommonModule,RouterLink,AuthCardComponent],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  email = '';
  password = '';
  errorMessage = '';

  constructor(private auth: AuthService, private router: Router) {}

  onSubmit() {
    this.login();
  }

  async login() {
    this.errorMessage = '';

    try {
      await this.auth.login(this.email, this.password);
      this.router.navigate(['/home']);
    } catch (err) {
      this.errorMessage = 'Credenziali non valide.';
    }
  }
}
