import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { AuthService } from '../../core/services/auth.service';
import { ThemeService } from '../../core/services/theme.service';

@Component ({
  selector: 'app-header',
  imports: [CommonModule, RouterModule, SearchBarComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent {
  isDarkMode = false;

  constructor(public authService: AuthService, private themeService: ThemeService) {}

    logout(): void {
    this.authService.logout();
  }

  ngOnInit(): void {
this.themeService.darkMode$.subscribe(value => this.isDarkMode = value);
  }

  toggleDarkMode(): void {
this.themeService.toggleDarkMode();
}
}