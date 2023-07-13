import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private languageSubject: BehaviorSubject<string> = new BehaviorSubject<string>('TR');
  public language$: Observable<string> = this.languageSubject.asObservable();

  constructor() { }

  public getLanguage(): Observable<string> {
    return this.languageSubject.asObservable();
  }

  public setLanguage(language: string): void {
    this.languageSubject.next(language);
  }
}