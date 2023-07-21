import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-food-details-header',
  templateUrl: './food-details-header.component.html',
  styleUrls: ['./food-details-header.component.scss'],
})
export class FoodDetailsHeaderComponent {
  currentLanguage$: Observable<string>;

  constructor(private languageService: LanguageService,
    private router: Router) {
    this.currentLanguage$ = this.languageService.getLanguage();
  }

  goMenu() {
    this.router.navigate(['/menu']);
  }

}
