import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.services';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule]
})
export class Tab1Page {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.email, this.password)
      .then(() => {
        alert('Login successful!');
        this.router.navigateByUrl('/tabs/tab2');
      })
      .catch(err => alert('Login failed: ' + err.message));
  }

  register() {
    this.authService.register(this.email, this.password)
      .then(() => {
        alert('Registration successful!');
        this.login(); // auto-login after registration
      })
      .catch(err => alert('Registration failed: ' + err.message));
  }
}
