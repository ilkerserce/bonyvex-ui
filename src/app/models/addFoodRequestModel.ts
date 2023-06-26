export class AddFoodRequestModel implements IAddFoodRequestModel {
  foodName: any;
  foodDescription?: any;
  foodPrice?: any;
  foodImageUrl?: any;
  foodVideoUrl?: any;
}

interface IAddFoodRequestModel {
  foodName: any;
  foodDescription?: any;
  foodPrice?: any;
  foodImageUrl?: any;
  foodVideoUrl?: any;
}