export class AddCategoryRequestModel implements IAddCategoryRequestModel {
  primaryCategory: any;
  secondaryCategory?: any;
}

interface IAddCategoryRequestModel {
  primaryCategory: any;
  secondaryCategory?: any;
}