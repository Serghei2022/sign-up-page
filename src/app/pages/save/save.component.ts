import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SummaryService } from '../../services/data/summary.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-save',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './save.component.html',
  styleUrl: './save.component.css'
})
export class SaveComponent implements OnInit {
  message: string | null = null;
  messageType: 'success' | 'error' | null = null;

  constructor(
    private router: Router,
    private summaryService: SummaryService
  ) {}

  ngOnInit(): void {
    this.handleRegistrationResult();
  }

  private handleRegistrationResult(): void {
    this.summaryService.getSignUpResult().pipe(
      tap(response => {
        if (response && response.responseCode === '201') {
          this.message = 'Registration successful!';
          this.messageType = 'success';
        } else {
          this.message = 'Registration failed. Please try again later.';
          this.messageType = 'error';
        }
      })
    ).subscribe({
      error: (error) => {
        this.message = 'An unexpected error occurred.';
        this.messageType = 'error';
      }
    });
  }
}
