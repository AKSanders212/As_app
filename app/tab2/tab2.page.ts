import { Component } from '@angular/core';
// Cordova plugin import (with /ngx)
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';

// Handles if the user is logged in,
//  preventing them from accessing other tabbed pages if not
import { AlertController } from '@ionic/angular';

// Firebase imports for db handling and credentials
import { auth, db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore';

// Handle redirects to home tab 1 page
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page {

  // Saves projects using Firebase
  projectName: string = '';
  projectId: string = '';
  userId: string = '';

  cards: {title: string; text?: string; image?: string}[] = [];
  cardCount = 0;

  constructor(private iab: InAppBrowser, private alertController: AlertController,       
    private router: Router) {

    this.loadInitialCards();
  }
  
  ionViewWillEnter() {

      onAuthStateChanged(auth, (user) => {
      if (user) {
        this.userId = user.uid;
        // If the user is authenticated, then we load in their projects
        this.loadProjects();
      }
      else {
          this.showLoginAlert();
      }
    });
  }

  private async showLoginAlert() {
  const alert = await this.alertController.create({
    header: 'Not Logged In',
    message: 'User not logged in, please register or login on Tab 1 page.',
    buttons: [{
      text: 'Go to Login',
      handler: () => {
        this.router.navigateByUrl('/tabs/tab1');
      }
    }]
  });
  await alert.present();
}

  async saveProject() {
    if (!this.userId || !this.projectId) return;

    await setDoc(doc(db, 'users', this.userId, 'projects', this.projectId), {
      name: this.projectName,
      id: this.projectId,
      createdAt: new Date(),
    });

    console.log('Project saved');
  }

  async loadProjects() {
  const projectCollection = collection(db, 'users', this.userId, 'projects');
  const snapshot = await getDocs(projectCollection);
  snapshot.forEach(doc => {
    console.log(doc.id, '=>', doc.data());
  });
}

  //function to load pixabay
  openPixabay() {
    const browser = this.iab.create('https://pixabay.com', '_blank', {
      location: 'yes',
      toolbar: 'yes',
    });
  }

  loadInitialCards() {
    // Load an initial 5 StormCards
    for (let i = 0; i < 5; i++) {
      this.cards.push(this.generateCard());
    }
  }

  loadMore(event: any) {
    setTimeout(() => {
      // Load 5 StormCards at a time after timeout
      for (let i = 0; i < 5; i++) {
        this.cards.push(this.generateCard());
      }
      event.target.complete();

      if (this.cards.length >= 60) {
        event.target.disabled = true;
      }
    }, 500);
  }

  addCards() {
    // When you click the button, add 3 more StormCards to the end of the scroll area
    for (let i = 0; i < 3; i++) {
      this.cards.push(this.generateCard());
    }
  }

  // When called generates 3 more StormCards based on cardCount incrementor
  generateCard() {
    this.cardCount++;
    return {
      title: `Card #${this.cardCount}`,
      text: '',
      image: ''
    };
  }

}
