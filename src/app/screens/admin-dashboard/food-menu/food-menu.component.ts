import { Component } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { FoodsService } from 'src/app/services/foods.service';
import { ToastrHandleService } from 'src/app/services/toastr-handle.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationModalComponent } from 'src/app/components/delete-confirmation-modal/delete-confirmation-modal.component';

@Component({
  selector: 'app-food-menu',
  templateUrl: './food-menu.component.html',
  styleUrls: ['./food-menu.component.scss']
})


export class FoodMenuComponent {
  private destroy$: Subject<boolean> = new Subject<boolean>();

  foods: any;

  constructor(private foodsService: FoodsService,
    private toastrHandleService: ToastrHandleService,
    private router: Router,
    public dialog: MatDialog) {
    this.getFoods();
  }

  ngOnInit(): void {

  }

  openDeleteConfirmationModal(food: any): void {
    const dialogRef = this.dialog.open(DeleteConfirmationModalComponent, {
      width: '350px',
      data: food,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteFood(food.id)
      }
    });
  }

  editFood(foodId: number) {
    this.router.navigate(['admin/foods/edit', foodId]);
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
          this.toastrHandleService.error(err.message)
        }
      });
  }

  getFoods() {
    this.foodsService.getFoods()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: res => {
          this.foods = res;
        },
        error: err => {
          this.toastrHandleService.error(err.message);
        }
      });
  }
}

