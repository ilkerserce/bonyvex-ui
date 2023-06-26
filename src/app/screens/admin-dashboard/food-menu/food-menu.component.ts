import { Component } from '@angular/core';

@Component({
  selector: 'app-food-menu',
  templateUrl: './food-menu.component.html',
  styleUrls: ['./food-menu.component.scss']
})


export class FoodMenuComponent {
  foods: any;

  ngOnInit(): void {
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

  constructor() {

  }
}
