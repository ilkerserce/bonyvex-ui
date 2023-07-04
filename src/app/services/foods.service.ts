import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from '../environments/environment.prod';
import { ApiPaths } from 'src/app/models/api-paths';
import { ApiBaseResponseModel } from '../models/api-base-response.model';
import { AddFoodRequestModel } from '../models/addFoodRequestModel';

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
    const url = `${this.baseUrl}/${ApiPaths.GetFoodForm}/${id}`;
    return this.httpClient.get<ApiBaseResponseModel>(url);
  }

  editFood(id:number, data: AddFoodRequestModel) {
    const url = `${this.baseUrl}/${ApiPaths.EditFood}/${id}`;
    return this.httpClient.post<ApiBaseResponseModel>(url, data);
  }

  deleteFood(id: number) {
    const url = `${this.baseUrl}/${ApiPaths.DeleteFood}/${id}`;
    return this.httpClient.delete<ApiBaseResponseModel>(url);
  }
}
