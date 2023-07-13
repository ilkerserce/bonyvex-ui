import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-mobile-navbar',
  templateUrl: './mobile-navbar.component.html',
  styleUrls: ['./mobile-navbar.component.scss']
})
export class MobileNavbarComponent {
  currentLanguage$: Observable<string>;

  constructor(private languageService: LanguageService) {
    this.currentLanguage$ = this.languageService.getLanguage();
  }

  changeLanguage(event: Event) {
    const target = event.target as HTMLSelectElement;
    const selectedLanguage = target.value;
    this.languageService.setLanguage(selectedLanguage);
  }
}