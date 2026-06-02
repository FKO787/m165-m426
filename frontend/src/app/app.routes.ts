import { Routes } from '@angular/router';
import { RegisterComponent } from '../components/loginPages/register/register.component';
import { NotImplementedComponent } from '../components/errorPages/notImplemented/notImplemented.component';
import { authGuard } from '../services/auth.guard';
import { redirectGuard } from '../services/rederect.guard';
import { LoginComponent } from '../components/loginPages/login/login.component';
import { publicGuard } from '../services/public.guard';
import { LayoutPageComponent } from '../components/Layout/layoutPage.component';
import { AllChatComponent } from '../components/chats/allChat/allChat.component';

export const routes: Routes = [
  { path: 'register', title: 'Register', component: RegisterComponent, canActivate: [publicGuard] },
  { path: 'login', title: 'Login', component: LoginComponent, canActivate: [publicGuard] },

  {
    path: '',
    component: LayoutPageComponent,
    canActivate: [authGuard],
    children: [
      { path: '', title: 'All Chat', component: AllChatComponent },
      { path: 'profile', title: 'Profile', component: NotImplementedComponent }, // TODO: ProfileComponent
    ],
  },

  { path: '**', canActivate: [redirectGuard], component: NotImplementedComponent },
];
