import { Routes } from '@angular/router';
import { RegisterComponent } from '../components/loginPages/register/register.component';
import { NotImplementedComponent } from '../components/errorPages/notImplemented/notImplemented.component';
import { authGuard } from '../services/auth.guard';
import { redirectGuard } from '../services/rederect.guard';
import { LoginComponent } from '../components/loginPages/login/login.component';
import { publicGuard } from '../services/public.guard';
import { LayoutPageComponent } from '../components/Layout/layoutPage.component';

export const routes: Routes = [
  { path: 'register', title: 'Register', component: RegisterComponent, canActivate: [publicGuard] },
  { path: 'login', title: 'Login', component: LoginComponent, canActivate: [publicGuard] },

  {
    path: '',
    component: LayoutPageComponent,
    canActivate: [authGuard],
    children: [
      { path: '', title: 'Global Chat', component: NotImplementedComponent }, // TODO: GlobalChatComponent
      { path: 'profile', title: 'Profile', component: NotImplementedComponent }, // TODO: ProfileComponent
    ],
  },

  { path: '**', canActivate: [redirectGuard], component: NotImplementedComponent },
];
