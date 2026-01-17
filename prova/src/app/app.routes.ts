import { Routes } from '@angular/router';
import { authGuard } from './auth/auth-guard';
import { Login } from './auth/login/login';
import { Register } from './auth/register/register';
import { Home } from './pages/home/home';

export const routes: Routes = [
//sintassi di authGuard
{ path: 'home', component: Home,
canActivate: [authGuard] },
{ path: 'auth/login', component: Login },
{ path: 'auth/register', component: Register },
{ path: '', redirectTo: 'auth/login', pathMatch: 'full' },
];
