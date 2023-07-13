import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-mobile-navbar',
  templateUrl: './mobile-navbar.component.html',
  styleUrls: ['./mobile-navbar.component.scss']
})
export class MobileNavbarComponent {
  currentLanguage$: Observable<string>;
  languageSelectionForm: FormGroup;
  @ViewChild('languageSelection') languageSelection: ElementRef;

  constructor(private languageService: LanguageService,
    private fb: FormBuilder,) {
    this.currentLanguage$ = this.languageService.getLanguage();
    this.languageSelectionForm = this.fb.group({
      language: '',
    });
  }

  ngOnInit(): void {

    this.currentLanguage$.subscribe(languageServiceValue => {
      this.languageSelectionForm.patchValue({
        language: languageServiceValue,
      })
    })
  }

  changeLanguage(event: Event) {
    const target = event.target as HTMLSelectElement;
    const selectedLanguage = target.value;
    this.languageService.setLanguage(selectedLanguage);
  }
}