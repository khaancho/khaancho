import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [

      {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)},
      { path: 'post-ad', loadComponent: () => import('./pages/post-ad/post-ad.component').then(m => m.PostAdComponent), canActivate: [AuthGuard] },
      { path: 'ad-details/:id', loadComponent: () => import('./pages/ad-details/ad-details.component').then(m => m.AdDetailsComponent)},
      { path: 'category/:name', loadComponent: () => import('./pages/category/category.component').then (m => m.CategoryComponent) },
      { path: 'profile/:id', loadComponent: () => import ('./pages/user-profile/user-profile.component').then (m => m.UserProfileComponent) },
      { path: 'contact-us', loadComponent: () => import ('./pages/contact-us/contact-us.component').then (m => m.ContactUsComponent) },
      { path: 'about', loadComponent: () => import ('./pages/about/about.component').then (m => m.AboutComponent) },
      { path: 'search', loadComponent: () => import ('./shared/search-bar/search-bar.component').then (m => m.SearchBarComponent) },
    ]
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', loadComponent: () => import('./auth/login/login.component').then (m => m.LoginComponent) },
      { path: 'register', loadComponent: () => import('./auth/register/register.component').then (m => m.RegisterComponent)},
    ]
  },
  { path: '**', redirectTo: '' }

];
