import { Component, inject } from '@angular/core';
import { Router } from '@angular/router'
import { AuthService } from "../../../services/auth.service";

@Component({
    selector: 'notimplemented',
    standalone: true,
    imports: [],
    templateUrl: './notImplemented.html',
})
export class NotImplementedComponent {
    private auth = inject(AuthService);
    private router = inject(Router);

    logout() {
        this.auth.logout();
        this.router.navigate(['/login']);
    }
    isLoggedIn = this.auth.isLoggedIn().toString();
    currentNavigation = this.router.url;
}