import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from '../environments/environment.prod';
import { ApiPaths } from 'src/app/models/api-paths';
import { ApiBaseResponseModel } from '../models/api-base-response.model';
import { AddPrimaryCategoryRequestModel, AddSubCategoryRequestModel, EditPrimaryCategoryRequestModel, EditSubCategoryRequestModel } from '../models/category-request.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private baseUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient) { }

  getCategories() {
    const url = `${this.baseUrl}/${ApiPaths.GetCategories}`;
    return this.httpClient.get<ApiBaseResponseModel>(url);
  }

  getPrimaryCategories() {
    const url = `${this.baseUrl}/${ApiPaths.GetPrimaryCategories}`;
    return this.httpClient.get<ApiBaseResponseModel>(url);
  }

  getSubCategoryForm(id: number) {
    const url = `${this.baseUrl}/${ApiPaths.GetSubCategoryForm}/${id}`;
    return this.httpClient.get<ApiBaseResponseModel>(url);
  }

  addPrimaryCategory(data: AddPrimaryCategoryRequestModel) {
    const url = `${this.baseUrl}/${ApiPaths.AddPrimaryCategory}`;
    return this.httpClient.post<ApiBaseResponseModel>(url, data);
  }

  editPrimaryCategory(id: number, data: EditPrimaryCategoryRequestModel) {
    const url = `${this.baseUrl}/${ApiPaths.EditPrimaryCategory}`;
    return this.httpClient.post<ApiBaseResponseModel>(url, data);
  }

  deletePrimaryCategory(id: number) {
    const url = `${this.baseUrl}/${ApiPaths.DeletePrimaryCategory}${id}`;
    return this.httpClient.delete<ApiBaseResponseModel>(url);
  }

  addSubCategory(data: AddSubCategoryRequestModel) {
    const url = `${this.baseUrl}/${ApiPaths.AddSubCategory}`;
    return this.httpClient.post<ApiBaseResponseModel>(url, data);
  }

  editSubCategory(id: number, data: EditSubCategoryRequestModel) {
    const url = `${this.baseUrl}/${ApiPaths.EditPrimaryCategory}/${id}`;
    return this.httpClient.post<ApiBaseResponseModel>(url, data);
  }

  deleteSubCategory(id: number) {
    const url = `${this.baseUrl}/${ApiPaths.DeleteSubCategory}/${id}`;
    return this.httpClient.delete<ApiBaseResponseModel>(url);
  }
}
