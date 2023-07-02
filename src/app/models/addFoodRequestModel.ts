export class AddFoodRequestModel implements IAddFoodRequestModel {
  name: any;
  description?: any;
  price?: any;
  imageUrl?: any;
  videoUrl?: any;
  primary_id?: any;
  sub_id?: any;
}

interface IAddFoodRequestModel {
  name: any;
  description?: any;
  price?: any;
  imageUrl?: any;
  videoUrl?: any;
  primary_id?: any;
  sub_id?: any;
}

export class UpdateFoodRequestModel implements IUpdateFoodRequestModel {
  id: any;
  name: any;
  description?: any;
  price?: any;
  imageUrl?: any;
  videoUrl?: any;
  primary_id?: any;
  sub_id?: any;
}

interface IUpdateFoodRequestModel {
  id: any;
  name: any;
  description?: any;
  price?: any;
  imageUrl?: any;
  videoUrl?: any;
  primary_id?: any;
  sub_id?: any;
}