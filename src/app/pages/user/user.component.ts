import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SignupService } from '../../services/data/signup.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {
  userForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private signupService: SignupService
  ) {
    this.userForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.maxLength(50)]],
      lastname: ['', [Validators.required, Validators.maxLength(50)]],
      username: ['', [Validators.required, Validators.maxLength(50)]],
      password1: ['', [Validators.required, Validators.minLength(8)]],
      password2: ['', [Validators.required, Validators.minLength(8)]],
      email: ['', [Validators.email, this.emailValidator, Validators.maxLength(100)]]
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    const userData = this.signupService.getUserData();
    if (userData) {
      this.userForm.patchValue({
        firstname: userData.firstname || '',
        lastname: userData.lastname || '',
        username: userData.username || '',
        password1: '',
        password2: '',
        email: userData.email || ''
      });
    }
  }

  private passwordMatchValidator(formGroup: FormGroup): ValidationErrors | null {
    const password1 = formGroup.get('password1')?.value;
    const password2 = formGroup.get('password2')?.value;
    return password1 === password2 ? null : { passwordsMismatch: true };
  }

  private emailValidator(control: AbstractControl): ValidationErrors | null {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const email = control.value;
    if (!email || emailRegex.test(email)) {
      return null;
    }
    return { invalidEmail: true };
  }

  onNext() {
    if (this.userForm.valid) {
      const userData = this.userForm.value;
      userData.firstname = userData.firstname.trim();
      userData.lastname = userData.lastname.trim();
      userData.username = userData.username.trim();
      userData.email = userData.email.trim();

      this.signupService.setUserData(userData);

      this.router.navigate(['/summary']);
    } else {
      console.error('User form is invalid.');
    }
  }
}
