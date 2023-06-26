import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from '../environments/environment.prod';
import { ApiPaths } from 'src/app/models/api-paths';
import { ApiBaseResponseModel } from '../models/api-base-response.model';
import { AddCategoryRequestModel } from '../models/addCategoryRequestModel';

@Injectable({
  providedIn: 'root'
})
export class AddCategoryService {

  private baseUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient) { }

  addCategory(data: AddCategoryRequestModel) {
    const url = `${this.baseUrl}/${ApiPaths.AddCategory}`;
    return this.httpClient.post<ApiBaseResponseModel>(url, data);
  }
}
