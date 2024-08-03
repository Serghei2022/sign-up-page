import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constant } from './constant/constant';
import { IndustryResponse } from '../../interfaces/industry.response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IndustryService {

  constructor(private http: HttpClient) { }

  getIndustry() {
    return this.http.get(Constant.API_END_POINT + Constant.METHODS.GET_ALL_INDUSTRIES);
  }

  getIndustryById(id: string): Observable<IndustryResponse> {
    return this.http.get<IndustryResponse>(
      `${Constant.API_END_POINT + Constant.METHODS.GET_INDUSTRY}${id}`
    );
  }
}
