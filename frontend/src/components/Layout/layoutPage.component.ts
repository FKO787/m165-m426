import { Component, inject } from '@angular/core';
import { RouterOutlet, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  styleUrls: [],
  templateUrl: './layoutPage.html',
})
export class LayoutPageComponent {
  private auth = inject(AuthService);
  private router = inject(Router);

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
