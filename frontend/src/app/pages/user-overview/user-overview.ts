import { Component, inject, OnInit, signal } from '@angular/core';

import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-overview',
  templateUrl: './user-overview.html',
  styleUrl: './user-overview.css',
})
export class UserOverviewComponent implements OnInit {
  private readonly userService = inject(UserService);

  protected readonly users = signal<User[]>([]);
  protected readonly loading = signal(true);
  protected readonly error = signal<string | null>(null);

  ngOnInit(): void {
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Benutzer konnten nicht geladen werden.');
        this.loading.set(false);
      },
    });
  }
}
