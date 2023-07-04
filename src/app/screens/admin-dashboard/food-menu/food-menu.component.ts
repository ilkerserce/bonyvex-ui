import { Component } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { FoodsService } from 'src/app/services/foods.service';
import { ToastrHandleService } from 'src/app/services/toastr-handle.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-food-menu',
  templateUrl: './food-menu.component.html',
  styleUrls: ['./food-menu.component.scss']
})


export class FoodMenuComponent {
  private destroy$: Subject<boolean> = new Subject<boolean>();

  foods: any;

  constructor(private foodsService: FoodsService,
    private toastrHandleService: ToastrHandleService, private router: Router) {
    this.getFoods();
  }

  ngOnInit(): void {

  }

  editFood(foodId: number) {
    this.router.navigate(['foods/edit', foodId]);
  }

  deleteFood(id: number) {
    this.foodsService.deleteFood(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: res => {
          this.toastrHandleService.success("Belirtilen yemek silindi.")
          this.getFoods();
        },
        error: err => {
         this.toastrHandleService.error(err)
        }
      });
  }

  getFoods() {
    this.foodsService.getFoods()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: res => {
          this.foods = res;
          console.log(res.data)
        },
        error: err => {
          if (err.error) {

          }
        }
      });
  }
}

