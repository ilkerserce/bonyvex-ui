export class AddSubCategoryRequestModel implements IAddSubCategoryRequestModel {
  newCategoryNameTR: any;
  newCategoryNameENG: any;
  newCategoryNameARB: any;
  targetCategory?: any;
}

interface IAddSubCategoryRequestModel {
  newCategoryNameTR: any;
  newCategoryNameENG: any;
  newCategoryNameARB: any;
  targetCategory?: any;
}

export class AddPrimaryCategoryRequestModel implements IAddPrimaryCategoryRequestModel {
  newCategoryNameTR: any;
  newCategoryNameENG: any;
  newCategoryNameARB: any;
}

interface IAddPrimaryCategoryRequestModel {
  newCategoryNameTR: any;
  newCategoryNameENG: any;
  newCategoryNameARB: any;
}