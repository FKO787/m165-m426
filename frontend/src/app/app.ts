import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RegisterComponent } from '../loginPages/register/register.component';

@Component({
  selector: 'root',
    imports: [
        RouterOutlet,
        RegisterComponent,
    ],
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('frontend');
}
