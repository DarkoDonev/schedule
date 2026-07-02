import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { ApiService } from './api.service';
import { Manager } from './models';

const tokenKey = 'shift_schedule_token';
const managerKey = 'shift_schedule_manager';

@Injectable({ providedIn: 'root' })
export class AuthService {
  readonly manager = signal<Manager | null>(this.readManager());

  constructor(
    private readonly api: ApiService,
    private readonly router: Router,
  ) {}

  get token() {
    return localStorage.getItem(tokenKey);
  }

  get isAuthenticated() {
    return Boolean(this.token);
  }

  login(email: string, password: string) {
    return this.api.login(email, password).pipe(
      tap((response) => {
        localStorage.setItem(tokenKey, response.accessToken);
        localStorage.setItem(managerKey, JSON.stringify(response.manager));
        this.manager.set(response.manager);
      }),
    );
  }

  logout() {
    localStorage.removeItem(tokenKey);
    localStorage.removeItem(managerKey);
    this.manager.set(null);
    void this.router.navigateByUrl('/login');
  }

  private readManager(): Manager | null {
    const raw = localStorage.getItem(managerKey);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as Manager;
    } catch {
      return null;
    }
  }
}
