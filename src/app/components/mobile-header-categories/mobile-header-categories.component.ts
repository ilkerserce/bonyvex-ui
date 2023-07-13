import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CategoriesService } from 'src/app/services/categories.service';
import { Subject, takeUntil } from "rxjs";

@Component({
  selector: 'app-mobile-header-categories',
  templateUrl: './mobile-header-categories.component.html',
  styleUrls: ['./mobile-header-categories.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MobileHeaderCategoriesComponent {
  private destroy$: Subject<boolean> = new Subject<boolean>();

  primaryCategoryList: [
    {
      "id": "1",
      "nameTR": "Elektronik",
      "nameENG": "Electronics",
      "iconUrl": "elektronik-icon.png"
    },
    {
      "id": "2",
      "nameTR": "Ev & Bahçe",
      "nameENG": "Home & Garden",
      "iconUrl": "ev-bahce-icon.png"
    },
    {
      "id": "3",
      "nameTR": "Moda",
      "nameENG": "Fashion",
      "iconUrl": "moda-icon.png"
    },
    {
      "id": "99",
      "nameTR": "Kategori yok",
      "nameENG": "Kategori yok",
      "nameARB": "Kategori yok",
      "iconUrl": "Kategori yok"
    }
  ];

  constructor(private categoriesService: CategoriesService,
    private toastrService: ToastrService) {
  }

  ngOnInit(): void {
    // this.getPrimaryCategories();
    // console.log(this.primaryCategoryList)
  }

  populateLists(data: any) {
    this.primaryCategoryList = data;
  }

  getPrimaryCategories() {
    this.categoriesService.getPrimaryCategories()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: res => {
          // this.populateLists(res['categories'])
          // debugger;
        },
        error: err => {
          this.toastrService.error(err.message);
        }
      });
  }

}
