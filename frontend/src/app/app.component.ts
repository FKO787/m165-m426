import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'root',
    imports: [RouterOutlet],
  templateUrl: './app.html',
})
export class App implements OnInit {
    private auth = inject(AuthService);

    ngOnInit() {
        this.auth.restoreSession();
    }
}
