// src/app/core/services/theme.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  // true = dark, false = light
  private _darkMode$ = new BehaviorSubject<boolean>(
    localStorage.getItem('theme') === 'dark'
  );
  readonly darkMode$ = this._darkMode$.asObservable();

  toggleDarkMode() {
    const next = !this._darkMode$.value;
    this._darkMode$.next(next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
    // also toggle on body for page‐wide styles
    document.body.classList.toggle('bg-dark', next);
    document.body.classList.toggle('text-light', next);
  }
}