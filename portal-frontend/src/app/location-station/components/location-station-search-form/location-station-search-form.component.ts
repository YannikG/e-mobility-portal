import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import LocationStationSearchModel from '../../models/location-station-search.model';
import { FormControl } from '@angular/forms';
import { KeyValuePair } from 'src/app/shared/models/keyvaluepair.model';

@Component({
  selector: 'app-location-station-search-form',
  templateUrl: './location-station-search-form.component.html',
  styleUrls: ['./location-station-search-form.component.scss']
})
export class LocationStationSearchFormComponent implements OnInit, OnChanges {
  // Inputs of selectable values
  @Input() plugTypes: KeyValuePair<number,string>[] = [];
  @Input() minRadius: number = 0;
  @Input() maxRadius!: number;

  // Input of model
  @Input() model!: LocationStationSearchModel;

  // Events
  @Output() onSearch = new EventEmitter();

  // Form controls
  plugTypeFormControl!: FormControl;
  radiusFormControl!: FormControl;

  // Lifecycle hooks
  ngOnInit(): void {
    this.initFormControls();
  }

  ngOnChanges(): void {
    if (this.plugTypeFormControl && this.model.plugId) {
      // Nope, this.plugTypeFormControl.setValue(this.model.plugId); DOES NOT WORK!!!
      // Because Angular...
      this.plugTypes.forEach(plug => {
        if (plug.key == this.model.plugId) {
          this.plugTypeFormControl.setValue(plug.key);
          return;
        }
      });
    }
  }
  // Methods
  private initFormControls() {
    this.plugTypeFormControl = new FormControl<number>(this.model.plugId);
    this.radiusFormControl = new FormControl<number>(this.model.radius);
  }

  onSearchButtonClicked() {
    this.model.plugId = this.plugTypeFormControl.value;
    this.model.radius = this.radiusFormControl.value;

    this.onSearch.emit();
  }
}
