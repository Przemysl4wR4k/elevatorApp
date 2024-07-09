import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-floor',
  standalone: true,
  imports: [],
  templateUrl: './floor.component.html',
  styleUrl: './floor.component.scss'
})
export class FloorComponent {
  @Input() id!: number
}
