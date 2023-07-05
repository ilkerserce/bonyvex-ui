//Primary
export class AddPrimaryCategoryRequestModel implements IAddPrimaryCategoryRequestModel {
  nameTR: string;
  nameENG: string;
  nameARB: string;
}

interface IAddPrimaryCategoryRequestModel {
  nameTR: string;
  nameENG: string;
  nameARB: string;
}

export class EditPrimaryCategoryRequestModel implements IEditPrimaryCategoryRequestModel {
  id: number;
  nameTR: string;
  nameENG: string;
  nameARB: string;
}

interface IEditPrimaryCategoryRequestModel {
  id: number;
  nameTR: string;
  nameENG: string;
  nameARB: string;
}
//Secondary

export class AddSubCategoryRequestModel implements IAddSubCategoryRequestModel {
  nameTR: string;
  nameENG: string;
  nameARB: string;
  parent_id?: number;
}

interface IAddSubCategoryRequestModel {
  nameTR: string;
  nameENG: string;
  nameARB: string;
  parent_id?: number;
}

export class EditSubCategoryRequestModel implements IEditSubCategoryRequestModel {
  id: number;
  nameTR: string;
  nameENG: string;
  nameARB: string;
  parent_id?: number;
}

interface IEditSubCategoryRequestModel {
  id: number;
  nameTR: string;
  nameENG: string;
  nameARB: string;
  parent_id?: number;
}
