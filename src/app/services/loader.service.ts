import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private loading: boolean = false;

  constructor() { }

  setLoading(value: boolean) {
    this.loading = value;
  }

  getLoading(): boolean {
    return this.loading;
  }

}
