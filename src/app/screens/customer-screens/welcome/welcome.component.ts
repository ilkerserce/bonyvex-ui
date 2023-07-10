import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent {

  constructor(private router: Router) {
  }

  viewFAQ() {
    this.router.navigate(['/faq']);
  }

  viewMenu() {
    this.router.navigate(['/menu']);
  }
}
