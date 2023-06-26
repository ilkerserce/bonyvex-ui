import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from '../environments/environment.prod';
import { ApiPaths } from 'src/app/models/api-paths';
import { ApiBaseResponseModel } from '../models/api-base-response.model';
import { AddFoodRequestModel } from '../models/addFoodRequestModel';

@Injectable({
  providedIn: 'root'
})
export class AddFoodService {

  private baseUrl = environment.baseUrl;
  
  constructor(private httpClient: HttpClient) { }

  addFood(data: AddFoodRequestModel) {
    const url = `${this.baseUrl}/${ApiPaths.AddFood}`;
    return this.httpClient.post<ApiBaseResponseModel>(url, data);
  }
}
