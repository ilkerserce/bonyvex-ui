import { ChangeDetectionStrategy, Component } from '@angular/core';
import { tap } from 'rxjs';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-menu-content',
  templateUrl: './menu-content.component.html',
  styleUrls: ['./menu-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuContentComponent {

  subCategories: any[] = [];

  constructor(private categoriesService: CategoriesService) { }

  getSubCategories(primaryCategoryId: number): void {
    this.categoriesService.getSubCategories(primaryCategoryId).pipe(
      tap((data: any) => {
        this.subCategories = data.subCategories;
        console.log(this.subCategories)
        // Diğer işlemleri gerçekleştirin (örneğin, bağlı yemekleri almak)
      })
    ).subscribe({
      error: (error: any) => {
        console.error(error);
      }
    });
  }
}
