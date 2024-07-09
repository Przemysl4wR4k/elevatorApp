import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ElevatorSystemComponent } from './components/elevator-system/elevator-system.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ElevatorSystemComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'elevator-system';
}
