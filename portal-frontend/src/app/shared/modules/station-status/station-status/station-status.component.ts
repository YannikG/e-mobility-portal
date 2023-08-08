import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-station-status',
  templateUrl: './station-status.component.html',
  styleUrls: ['./station-status.component.scss']
})
export class StationStatusComponent {
  @Input() status!: string;

  calculateColor(): string {
    let result = "station-chip";
    switch (this.status.toLowerCase()) {
      case 'available':
        result+= ' status-available';
        break;
      case 'occupied':
        result +=' status-occupied';
        break;
      default:
        result+= ' status-unknown';
        break;
    }

    return result;
  }
}