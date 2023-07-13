import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject, takeUntil } from 'rxjs';
import { CategoriesService } from 'src/app/services/categories.service';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  private destroy$: Subject<boolean> = new Subject<boolean>();
  currentLanguage$: Observable<string>;

  primaryCategoryList: any;
  subCategories: any;
  language: any;

  constructor(private categoriesService: CategoriesService,
    private toastrService: ToastrService,
    private languageService: LanguageService) {
    this.currentLanguage$ = this.languageService.getLanguage();
  }

  ngOnInit(): void {
    this.getPrimaryCategories();
    this.getSubCategories(1);
  }

  populatePrimaryList(data: any) {
    this.primaryCategoryList = data;
  }

  populateFoodList(data: any) {
    this.subCategories = data;
  }

  getPrimaryCategories() {
    this.categoriesService.getPrimaryCategories()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: res => {
          this.populatePrimaryList(res['categories'])
        },
        error: err => {
          this.toastrService.error(err.message);
        }
      });
  }

  getSubCategories(primaryCategoryId: number): void {
    this.categoriesService.getSubCategories(primaryCategoryId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: res => {
          this.populateFoodList(res['subCategories'])
          console.log(this.subCategories)
        },
        error: err => {
          this.toastrService.error(err.message);
        }
      })
  }
}
