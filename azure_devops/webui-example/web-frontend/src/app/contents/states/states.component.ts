import { Component } from '@angular/core';
import {MetaDataService} from "../../common/api/meta-data.service";
import {SupportedOperation} from "../../common/model/field";
import {MatTableModule} from "@angular/material/table";
import {State, StateValue} from "../../common/model/state";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

@Component({
  selector: 'app-states',
  standalone: true,
    imports: [
        MatTableModule,
        MatProgressSpinnerModule
    ],
  templateUrl: './states.component.html',
  styleUrl: './states.component.scss'
})
export class StatesComponent {
  public isLoading: boolean = true;

  public displayedColumns: string[] = [
    "name",
    "color",
    "category"
  ];
  public values: StateValue[] = [];

  constructor(private readonly metaDataService: MetaDataService) {}

  ngOnInit(): void {
    console.log("ngOnInit");
    this.metaDataService.getMetaDataStates().subscribe((state: State) => {
      console.log(state);
      this.values = state.value;
      console.log(this.values);
      this.isLoading = false;
    });
  }

  getChildrenName(values: SupportedOperation[]) {
    return values.map((c) => { return c.name});
  }
}
