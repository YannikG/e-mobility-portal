import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StationStatusComponent } from './station-status/station-status.component';

@NgModule({
  declarations: [
    StationStatusComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    StationStatusComponent
  ]
})
export class StationStatusModule { }
