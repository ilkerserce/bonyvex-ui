import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from '../environments/environment.prod';
import { ApiPaths } from 'src/app/models/api-paths';
import { ApiBaseResponseModel } from '../models/api-base-response.model';
import { AddPrimaryCategoryRequestModel, AddSubCategoryRequestModel } from '../models/addCategoryRequestModel';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private baseUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient) { }

  getCategories(){
    const url = `${this.baseUrl}/${ApiPaths.GetCategories}`;
    return this.httpClient.get<ApiBaseResponseModel>(url);
  }

  addPrimaryCategory(data: AddPrimaryCategoryRequestModel) {
    const url = `${this.baseUrl}/${ApiPaths.AddPrimaryCategory}`;
    return this.httpClient.post<ApiBaseResponseModel>(url, data);
  }

  editPrimaryCategory(data: AddPrimaryCategoryRequestModel) {
    const url = `${this.baseUrl}/${ApiPaths.EditPrimaryCategory}`;
    return this.httpClient.post<ApiBaseResponseModel>(url, data);
  }

  deletePrimaryCategory(data: AddPrimaryCategoryRequestModel) {
    const url = `${this.baseUrl}/${ApiPaths.DeletePrimaryCategory}`;
    return this.httpClient.post<ApiBaseResponseModel>(url, data);
  }

  addSubCategory(data: AddSubCategoryRequestModel) {
    const url = `${this.baseUrl}/${ApiPaths.AddSubCategory}`;
    return this.httpClient.post<ApiBaseResponseModel>(url, data);
  }

  editSubCategory(data: AddPrimaryCategoryRequestModel) {
    const url = `${this.baseUrl}/${ApiPaths.EditPrimaryCategory}`;
    return this.httpClient.post<ApiBaseResponseModel>(url, data);
  }

  deleteSubCategory(data: AddPrimaryCategoryRequestModel) {
    const url = `${this.baseUrl}/${ApiPaths.DeleteSubCategory}`;
    return this.httpClient.post<ApiBaseResponseModel>(url, data);
  }
}
