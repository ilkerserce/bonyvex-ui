import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../environments/environment';
import { ApiPaths } from '../models/api-paths';
import { LoginRequestModel } from '../models/login.model';
import { ActivatedRoute, Params, Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient,
    private router: Router) { };

  getUserLoginInfo() {
    return JSON.parse(sessionStorage.getItem('loggedIn') || 'false');
  }

  logout() {
    sessionStorage.removeItem('loggedIn');
    this.router.navigate(['/login']);
  }

  login(data: any) {
    const url = `${this.baseUrl}/${ApiPaths.Login}`;
    return this.http.post(url, data);
  }
}


