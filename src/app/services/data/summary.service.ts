import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SummaryService {

  private signUpDataSubject = new BehaviorSubject<{ responseCode: string } | null>(null);

  setSignUpResult(data: { responseCode: string }) {
    this.signUpDataSubject.next(data);
  }

  getSignUpResult(): Observable<{ responseCode: string } | null> {
    return this.signUpDataSubject.asObservable();
  }
}
