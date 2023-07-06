import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from '../environments/environment.prod';
import { ApiPaths } from 'src/app/models/api-paths';
import { ApiBaseResponseModel } from '../models/api-base-response.model';
import { AddFAQRequestModel, EditFAQRequestModel } from '../models/faqs.model';

@Injectable({
  providedIn: 'root'
})
export class FaqsService {
  private baseUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient) { }

  getFAQs() {
    const url = `${this.baseUrl}/${ApiPaths.GetFAQs}`;
    return this.httpClient.get<ApiBaseResponseModel>(url);
  }

  getFAQForm(id: number) {
    const url = `${this.baseUrl}/${ApiPaths.GetFAQForm}/${id}`;
    return this.httpClient.get<ApiBaseResponseModel>(url);
  }

  addFAQ(data: AddFAQRequestModel) {
    const url = `${this.baseUrl}/${ApiPaths.AddFAQ}`;
    return this.httpClient.post<ApiBaseResponseModel>(url, data);
  }

  editFAQ(id: number, data: EditFAQRequestModel) {
    const url = `${this.baseUrl}/${ApiPaths.EditFAQ}/${id}`;
    return this.httpClient.post<ApiBaseResponseModel>(url, data);
  }

  deleteFAQ(id: number) {
    const url = `${this.baseUrl}/${ApiPaths.DeleteFAQ}/${id}`;
    return this.httpClient.delete<ApiBaseResponseModel>(url);
  }
}
