import { Routes } from '@angular/router';
import { RegisterComponent } from '../components/loginPages/register/register.component.js';
import { NotImplementedComponent } from '../components/errorPages/notImplemented/notImplemented.component.js';
import { authGuard } from '../services/auth.guard.js';
import { redirectGuard } from '../services/rederect.guard.js';

export const routes: Routes = [
  { path: 'register', title: 'Register', component: RegisterComponent },
  { path: 'login', title: 'Login', component: NotImplementedComponent }, // TODO: LoginComponent

  { path: '', title: 'Home', component: NotImplementedComponent, canActivate: [authGuard] }, // TODO: MainpageComponent

  { path: '**', canActivate: [redirectGuard], component: NotImplementedComponent },
];
