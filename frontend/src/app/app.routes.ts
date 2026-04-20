import { Routes } from '@angular/router';
import { RegisterComponent } from '../components/loginPages/register/register.component';
import { NotImplementedComponent } from '../components/errorPages/notImplemented/notImplemented.component';
import { authGuard } from '../services/auth.guard';
import { redirectGuard } from '../services/rederect.guard';
import { UserOverviewComponent } from './pages/user-overview/user-overview';

export const routes: Routes = [
    { path: 'register', title: 'Register', component: RegisterComponent },
    { path: 'login', title: 'Login', component: NotImplementedComponent }, // TODO: LoginComponent
    { path: 'users', component: UserOverviewComponent, canActivate: [authGuard] }, // TODO: Update guard to Admin only

    { path: '', title: 'Home', component: NotImplementedComponent, canActivate: [authGuard] }, // TODO: MainpageComponent

    { path: '**', canActivate: [redirectGuard], component: NotImplementedComponent }
];
