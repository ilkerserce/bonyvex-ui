import { Component } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { FoodsService } from 'src/app/services/foods.service';
import { ToastrHandleService } from 'src/app/services/toastr-handle.service';

@Component({
  selector: 'app-food-menu',
  templateUrl: './food-menu.component.html',
  styleUrls: ['./food-menu.component.scss']
})


export class FoodMenuComponent {
  private destroy$: Subject<boolean> = new Subject<boolean>();

  foods: any;

  constructor(private foodsService: FoodsService,
    private toastrHandleService: ToastrHandleService) {
  }

  ngOnInit(): void {
    this.getFoods();

    this.foods = [
      {
        "id": 1,
        "name": "Balon Ekmek",
        "description": "Güzel yemek",
        "price": 100
      },
      {
        "id": 2,
        "name": "Sade Ekmek",
        "description": "Cok güzel yemek",
        "price": 200
      },
      {
        "id": 3,
        "name": "Tereyağlı Ekmek",
        "description": "Fena değil",
        "price": 300
      },
      {
        "id": 4,
        "name": "Ballı Ekmek",
        "description": "Alerjen içerir",
        "price": 400
      },
    ]
  }

  getFoods() {
    this.foodsService.getFoods()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: res => {

        },
        error: err => {
          if (err.error) {

          }
        }
      });
  }
}

