import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService, LoginRequest, AuthResponse } from '../../../core/services/auth.service';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
  ],
  template: `
    <div class="container">
      <h1>Sign in</h1>

      <form [formGroup]="form" (ngSubmit)="onSubmit()" novalidate>
        <mat-form-field appearance="outline" class="full">
          <mat-label>Email</mat-label>
          <input matInput type="email" formControlName="email" placeholder="you@example.com" />
          <mat-error *ngIf="email?.hasError('required')">Email is required</mat-error>
          <mat-error *ngIf="email?.hasError('email')">Invalid email</mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline" class="full">
          <mat-label>Password</mat-label>
          <input matInput type="password" formControlName="password" />
          <mat-error *ngIf="password?.hasError('required')">Password is required</mat-error>
          <mat-error *ngIf="password?.hasError('minlength')">Min length is 6</mat-error>
        </mat-form-field>

        <button
          mat-raised-button
          color="primary"
          class="full"
          [disabled]="form.invalid || loading">
          {{ loading ? 'Signing in…' : 'Sign in' }}
        </button>
      </form>

      <p class="hint">
        No account yet ?
        <a routerLink="/register">Create one</a>
      </p>
    </div>
  `,
  styles: [`
    .container {
      max-width: 420px;
      margin: 40px auto;
      padding: 0 16px;
    }
    .full {
      width: 100%;
    }
    form {
      display: grid;
      gap: 16px;
    }
    .hint {
      margin-top: 12px;
      opacity: .8;
    }
  `],
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  loading = false;

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;

    const payload = this.form.value as LoginRequest;

    this.auth.login(payload).subscribe({
      next: (res: AuthResponse) => {
        // stockage simple pour l’instant
        localStorage.setItem('mercatura_token', res.accessToken);
        localStorage.setItem('mercatura_user', JSON.stringify({
          id: res.id,
          email: res.email,
          role: res.role,
        }));

        this.snackBar.open('Welcome back 👋', 'OK', { duration: 2500 });
        this.router.navigateByUrl('/'); // on changera plus tard vers /account, /catalog…
      },
      error: (err) => {
        const msg = err?.error?.message || 'Invalid credentials';
        this.snackBar.open(msg, 'Close', { duration: 4000 });
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      },
    });
  }
}
