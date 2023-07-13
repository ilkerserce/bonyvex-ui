export class AddFoodRequestModel implements IAddFoodRequestModel {
  nameTR: string;
  nameENG: string;
  nameARB: string;
  descriptionTR: string;
  descriptionENG: string;
  descriptionARB: string;
  price: number;
  imageUrl?: string;
  videoUrl?: string;
  subCategory: number;
}

interface IAddFoodRequestModel {
  nameTR: string;
  nameENG: string;
  nameARB: string;
  descriptionTR: string;
  descriptionENG: string;
  descriptionARB: string;
  price: number;
  imageUrl?: string;
  videoUrl?: string;
  subCategory: number;
}

export class EditFoodRequestModel implements IEditFoodRequestModel {
  id: number;
  nameTR: string;
  nameENG: string;
  nameARB: string;
  descriptionTR: string;
  descriptionENG: string;
  descriptionARB: string;
  price: number;
  imageUrl?: string;
  videoUrl?: string;
  subCategory: number;
}

interface IEditFoodRequestModel {
  id: any;
  nameTR: string;
  nameENG: string;
  nameARB: string;
  descriptionTR: string;
  descriptionENG: string;
  descriptionARB: string;
  price: number;
  imageUrl?: string;
  videoUrl?: string;
  subCategory: number;
}