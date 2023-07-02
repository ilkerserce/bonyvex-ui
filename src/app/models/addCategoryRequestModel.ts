export class AddSubCategoryRequestModel implements IAddSubCategoryRequestModel {
  primaryCategory: any;
  secondaryCategory?: any;
}

interface IAddSubCategoryRequestModel {
  primaryCategory: any;
  secondaryCategory?: any;
}

export class AddPrimaryCategoryRequestModel implements IAddPrimaryCategoryRequestModel {
  primaryCategory: any;
}

interface IAddPrimaryCategoryRequestModel {
  primaryCategory: any;
}