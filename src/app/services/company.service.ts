import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Constant } from './constant/constant';
import { SignupService } from './data/signup.service';
import { CompanyResponse } from '../../interfaces/company.response';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private name: string | undefined;
  private industryId: string | undefined;

  constructor(
    private http: HttpClient,
    private signupService: SignupService
  ) { }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }

  postCompany(): Observable<HttpResponse<CompanyResponse>> {
    const companyData = this.signupService.getCompanyData();

    if (!companyData) {
      throw new Error('No company data available.');
    }

    const postData = {
      name: companyData.name,
      industryId: companyData.industry
    };

    // console.log('Post Company Data:', postData);

    return this.http.post<CompanyResponse>(Constant.API_END_POINT + Constant.METHODS.POST_COMPANY, postData, { observe: 'response' })
      .pipe(
        catchError(this.handleError)
      );
  }
}
