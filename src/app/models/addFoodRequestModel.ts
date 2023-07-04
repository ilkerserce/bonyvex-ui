export class AddFoodRequestModel implements IAddFoodRequestModel {
  nameTR: any;
  nameENG: any;
  nameARB: any;
  descriptionTR?: any;
  descriptionENG?: any;
  descriptionARB?: any;
  price?: any;
  imageUrl?: any;
  videoUrl?: any;
  primaryCategory: any;
  subCategory: any;
}

interface IAddFoodRequestModel {
  nameTR: any;
  nameENG: any;
  nameARB: any;
  descriptionTR?: any;
  descriptionENG?: any;
  descriptionARB?: any;
  price?: any;
  imageUrl?: any;
  videoUrl?: any;
  primaryCategory: any;
  subCategory: any;
}

export class EditFoodRequestModel implements IEditFoodRequestModel {
  id: any;
  nameTR: any;
  nameENG: any;
  nameARB: any;
  descriptionTR?: any;
  descriptionENG?: any;
  descriptionARB?: any;
  price?: any;
  imageUrl?: any;
  videoUrl?: any;
  primaryCategory: any;
  subCategory: any;
}

interface IEditFoodRequestModel {
  id: any;
  nameTR: any;
  nameENG: any;
  nameARB: any;
  descriptionTR?: any;
  descriptionENG?: any;
  descriptionARB?: any;
  price?: any;
  imageUrl?: any;
  videoUrl?: any;
  primaryCategory: any;
  subCategory: any;
}