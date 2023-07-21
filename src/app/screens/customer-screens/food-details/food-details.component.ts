import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject, Observable, takeUntil } from 'rxjs';
import { CategoriesService } from 'src/app/services/categories.service';
import { FoodsService } from 'src/app/services/foods.service';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-food-details',
  templateUrl: './food-details.component.html',
  styleUrls: ['./food-details.component.scss']
})
export class FoodDetailsComponent {
  private destroy$: Subject<boolean> = new Subject<boolean>();
  currentLanguage$: Observable<string>;

  foodId!: number;
  primaryCategoryList: any;
  foodData: any;
  language: any;

  constructor(private categoriesService: CategoriesService,
    private toastrService: ToastrService,
    private languageService: LanguageService,
    private route: ActivatedRoute,
    private foodsService: FoodsService,
    private router: Router) {
    this.currentLanguage$ = this.languageService.getLanguage();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.foodId = +params['id']
    })
    this.getFoodForm();
  }

  populateForm(data: any) {
    this.foodData = data;
  }

  getFoodForm() {
    this.foodsService.getFoodForm(this.foodId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: res => {
          this.populateForm(res);
        },
        error: err => {

        }
      })
  }
}