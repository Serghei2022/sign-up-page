import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CompanyService } from '../../services/company.service';
import { UserService } from '../../services/user.service';
import { CompanyResponse } from '../../../interfaces/company.response';
import { SignupService } from '../../services/data/signup.service';
import { IndustryService } from '../../services/industry.service';
import { IndustryResponse } from '../../../interfaces/industry.response';
import { SummaryService } from '../../services/data/summary.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.css'
})
export class SummaryComponent implements OnInit {
  summaryForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private companyService: CompanyService,
    private userService: UserService,
    private signupService: SignupService,
    private industryService: IndustryService,
    private summaryService: SummaryService
  ) {
    this.summaryForm = this.fb.group({
      name: [{ value: '', disabled: true }],
      industry: [{ value: '', disabled: true }],
      firstname: [{ value: '', disabled: true }],
      lastname: [{ value: '', disabled: true }],
      username: [{ value: '', disabled: true }],
      email: [{ value: '', disabled: true }],
      terms: [false, Validators.requiredTrue],
      privacy: [false, Validators.requiredTrue]
    });
  }

  ngOnInit(): void {
    this.loadFormData();
  }

  loadFormData(): void {
    const companyData = this.signupService.getCompanyData();
    const userData = this.signupService.getUserData();

    if (companyData) {
      this.industryService.getIndustryById(companyData.industry).subscribe((industry: IndustryResponse) => {
        this.summaryForm.patchValue({
          name: companyData.name,
          industry: industry.name,
        });
      });
    }

    if (userData) {
      this.summaryForm.patchValue({
        firstname: userData.firstname,
        lastname: userData.lastname,
        username: userData.username,
        email: userData.email
      });
    }
  }

  get isFormValid(): boolean {
    return this.allFieldsNotEmpty() && this.areCheckboxesChecked();
  }

  private allFieldsNotEmpty(): boolean {
    const formValues = this.summaryForm.getRawValue();

    const requiredFields = ['name', 'industry', 'firstname', 'lastname', 'username', 'terms', 'privacy'];

    return requiredFields.every(field => {
      const value = formValues[field];
      return value !== '' && value !== false;
    });
  }

  private areCheckboxesChecked(): boolean {
    return this.summaryForm.get('terms')?.value && this.summaryForm.get('privacy')?.value;
  }

  onSubmit() {
    if (this.isFormValid) {
      this.companyService.postCompany().subscribe({
        next: (companyResponse: HttpResponse<CompanyResponse>) => {
          // console.log('Company Service Response:', companyResponse.body);
          // console.log('Company Service Response Status Code:', companyResponse.status);

          this.userService.postUser(companyResponse.body?.id || '').subscribe({
            next: (userResponse: HttpResponse<any>) => {
              // console.log('User Service Response:', userResponse.body);
              // console.log('User Service Response Status Code:', userResponse.status);

              if (userResponse.status === 201) {
                this.summaryService.setSignUpResult({
                  responseCode: '201'
                });
                this.router.navigate(['/save']);
              } else {
                console.error('User registration failed with status code:', userResponse.status);
              }
            },
            error: (error) => {
              console.error('User Service Error:', error);
            }
          });
        },
        error: (error) => {
          console.error('Company Service Error:', error);
        }
      });
    } else {
      console.error('Form is not valid.');
    }
  }
}
