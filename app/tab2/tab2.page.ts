import { Component } from '@angular/core';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page {
  cards: {title: string; text?: string; image?: string}[] = [];
  cardCount = 0;
  constructor(private iab: InAppBrowser) {
    this.loadInitialCards();
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

  generateCard() {
    this.cardCount++;
    return {
      title: `Card #${this.cardCount}`,
      text: '',
      image: ''
    };
  }

}
