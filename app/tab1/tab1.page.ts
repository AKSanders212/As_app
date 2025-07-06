import { Component } from '@angular/core';
import { Router } from '@angular/router';

// Angular core -> services/auth.service.ts
import { AuthService } from '../services/auth.services';

import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Firebase imports -> firebase.ts
import { auth, db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule]
})
export class Tab1Page {
  
  // Firebase credentials login email/username/password
  email: string = '';
  password: string = '';
  username: string = '';
  userId: string = '';

  constructor(private authService: AuthService, private router: Router) {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.userId = user.uid;
      }
    });
  }  

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

  async saveUsername() {
    if (!this.userId)
      return;

    await setDoc(doc(db, 'users', this.userId), {
      username: this.username,
      }, {merge: true});
      
      console.log('Username has been saved');
    }
}

