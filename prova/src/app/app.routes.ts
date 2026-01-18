import { Routes } from '@angular/router';
import { authGuard } from './auth/auth-guard';
import { Login } from './auth/login/login';
import { Register } from './auth/register/register';
import { Home } from './pages/home/home';
import { Catalogo } from './pages/catalogo/catalogo';

export const routes: Routes = [
  {
    path: 'home',
    component: Home,
    canActivate: [authGuard],
  },
  {
    path: 'catalogo',
    component: Catalogo,
    canActivate: [authGuard],
  },
  {
    path: 'auth/login',
    component: Login,
  },
  {
    path: 'auth/register',
    component: Register,
  },
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
