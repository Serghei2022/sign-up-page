import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Constant } from './constant/constant';
import { SignupService } from './data/signup.service';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private firstName: string | undefined;
  private lastName: string | undefined;
  private userName: string | undefined;
  private password: string | undefined;
  private email: string | undefined;

  constructor(
    private http: HttpClient,
    private signupService: SignupService
  ) { }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }

  postUser(companyId: string): Observable<HttpResponse<any>> {
    const userData = this.signupService.getUserData();

    if (!userData) {
      throw new Error('No user data available.');
    }

    const postData = {
      firstName: userData.firstname,
      lastName: userData.lastname,
      userName: userData.username,
      password: userData.password1,
      email: userData.email,
      companyId: companyId
    };

    // console.log('Post User Data:', postData);

    return this.http.post<any>(Constant.API_END_POINT + Constant.METHODS.POST_USER, postData, { observe: 'response' })
      .pipe(
        catchError(this.handleError)
      );
  }

  getUser(Username: string): Observable<HttpResponse<any>> {
    return this.http.get<any>(Constant.API_END_POINT + Constant.METHODS.GET_USER + Username, { observe: 'response' });
  }
}
