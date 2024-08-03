import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  private companyData: { name: string, industry: string } | null = null;
  private userData: { firstname: string, lastname: string,
                      username: string, password1: string, password2: string,
                      email: string, companyId: string
                    } | null = null;

  setCompanyData(data: { name: string, industry: string }) {
    this.companyData = data;
  }

  getCompanyData() {
    return this.companyData;
  }

  setUserData(data: { firstname: string, lastname: string,
                      username: string, password1: string, password2: string,
                      email: string, companyId: string
                    }) {
    this.userData = data;
  }

  getUserData() {
    return this.userData;
  }
}
