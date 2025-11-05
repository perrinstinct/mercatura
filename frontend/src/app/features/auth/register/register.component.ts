import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { matchValidator } from '../../../shared/validators/match.validator';

@Component({
  standalone: true,
  selector: 'app-register',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
  ],
  template: `
  <div class="container">
    <h1>Create your account</h1>

    <form [formGroup]="form" (ngSubmit)="onSubmit()" novalidate>
      <mat-form-field appearance="outline" class="full">
        <mat-label>Email</mat-label>
        <input matInput placeholder="you@example.com" formControlName="email" type="email" />
        <mat-error *ngIf="email?.hasError('required')">Email is required</mat-error>
        <mat-error *ngIf="email?.hasError('email')">Email is invalid</mat-error>
      </mat-form-field>

      <mat-form-field appearance="outline" class="full">
        <mat-label>Password</mat-label>
        <input matInput formControlName="password" type="password" />
        <mat-error *ngIf="password?.hasError('required')">Password is required</mat-error>
        <mat-error *ngIf="password?.hasError('minlength')">
          Minimum length is 6 characters
        </mat-error>
      </mat-form-field>

      <mat-form-field appearance="outline" class="full">
        <mat-label>Confirm password</mat-label>
        <input matInput formControlName="confirmPassword" type="password" />
        <mat-error *ngIf="confirmPassword?.hasError('required')">
          Confirmation is required
        </mat-error>
        <mat-error *ngIf="form?.hasError('mismatch')">
          Passwords do not match
        </mat-error>
      </mat-form-field>

      <button mat-raised-button color="primary" class="full" [disabled]="form.invalid || loading">
        {{ loading ? 'Creating...' : 'Create account' }}
      </button>
    </form>
  </div>
  `,
  styles: [`
    .container { max-width: 420px; margin: 40px auto; padding: 0 16px; }
    .full { width: 100%; }
    form { display: grid; gap: 16px; }
  `]
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private snack = inject(MatSnackBar);
  private router = inject(Router);

  loading = false;

  form = this.fb.group(
    {
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    },
    { validators: matchValidator('password', 'confirmPassword') }
  );

  get email() { return this.form.get('email'); }
  get password() { return this.form.get('password'); }
  get confirmPassword() { return this.form.get('confirmPassword'); }

  onSubmit() {
    if (this.form.invalid) return;
    this.loading = true;

    const { email, password } = this.form.value as { email: string; password: string };

    this.auth.register({ email, password }).subscribe({
      next: () => {
        this.snack.open('Account created! You can now log in.', 'OK', { duration: 3000 });
        this.router.navigateByUrl('/login'); // route à créer plus tard
      },
      error: (err) => {
        const msg = err?.error?.message || 'Registration failed';
        this.snack.open(msg, 'Close', { duration: 4000 });
        this.loading = false;
      },
      complete: () => (this.loading = false),
    });
  }
}
