import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from '../environments/environment';
import { ApiPaths } from 'src/app/models/api-paths';
import { ApiBaseResponseModel } from '../models/api-base-response.model';
import { AddFoodRequestModel, EditFoodRequestModel } from '../models/add-food-request.model';

@Injectable({
  providedIn: 'root'
})
export class FoodsService {

  private baseUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient) { }

  getFoods() {
    const url = `${this.baseUrl}/${ApiPaths.GetFoods}`;
    return this.httpClient.get<ApiBaseResponseModel>(url);
  }

  addFood(data: AddFoodRequestModel) {
    const url = `${this.baseUrl}/${ApiPaths.AddFood}`;
    return this.httpClient.post<ApiBaseResponseModel>(url, data);
  }

  getFoodForm(id: number) {
    const url = `${this.baseUrl}/${ApiPaths.GetFoodForm}/?id=${id}`;
    return this.httpClient.get<ApiBaseResponseModel>(url);
  }

  editFood(id: number, data: EditFoodRequestModel) {
    const url = `${this.baseUrl}/${ApiPaths.EditFood}`;
    return this.httpClient.post<ApiBaseResponseModel>(url, data);
  }

  deleteFood(id: number) {
    const url = `${this.baseUrl}/${ApiPaths.DeleteFood}/?id=${id}`;
    return this.httpClient.delete<ApiBaseResponseModel>(url);
  }

  uploadFoodImage(file: File) {
    const formData = new FormData();
    formData.append('image', file);

    return this.httpClient.post<any>(`${this.baseUrl}/${ApiPaths.Upload}`, formData);

  }
}
