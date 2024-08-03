import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IndustryService } from '../../services/industry.service';
import { SignupService } from '../../services/data/signup.service';

@Component({
  selector: 'app-company',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './company.component.html',
  styleUrl: './company.component.css'
})
export class CompanyComponent implements OnInit {
  companyForm!: FormGroup;
  industries: { id: string, name: string }[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private industryService: IndustryService,
    private signupService: SignupService
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.loadIndustries();
  }

  private initializeForm(): void {
    const companyData = this.signupService.getCompanyData();
    this.companyForm = this.fb.group({
      name: [companyData?.name || '', [Validators.required, Validators.maxLength(100)]],
      industry: [companyData?.industry || '', Validators.required]
    });
  }

  private loadIndustries(): void {
    this.industryService.getIndustry().subscribe({
      next: (res: any) => {
        // this.industries = res;
        this.industries = Array.isArray(res) ? res : [];
      },
      error: (error) => {
        console.error('Error fetching industries:', error);
      }
    });
  }

  onNext() {
    if (this.companyForm.valid) {
      const companyData = this.companyForm.value;
      companyData.name = companyData.name.trim();
      this.signupService.setCompanyData(companyData);

      this.router.navigate(['/user']);
    } else {
      console.error('Company form is invalid.');
    }

  }

}
