import { Component, inject } from '@angular/core';
import { Router } from '@angular/router'

@Component({
    selector: 'notimplemented',
    standalone: true,
    imports: [],
    templateUrl: './notImplemented.html',
})
export class NotImplementedComponent {
    private router = inject(Router);
    currentNavigation = this.router.url;
}