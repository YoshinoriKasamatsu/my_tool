import {Component} from '@angular/core';
import {MetaDataService} from "../../common/api/meta-data.service";
import {Classification, ClassificationValue} from "../../common/model/classification";
import {MatTableModule} from "@angular/material/table";
import {map} from 'rxjs';
import {SupportedOperation} from "../../common/model/field";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";


@Component({
  selector: 'app-classification',
  standalone: true,
  imports: [
    MatTableModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './classification.component.html',
  styleUrl: './classification.component.scss'
})
export class ClassificationComponent {
  public isLoading: boolean = true;

  public displayedColumns: string[] = [
    "id",
    "identifier",
    "name",
    "structureType",
    "hasChildren",
    "children",
    "path",
    // "url"
  ];
  public values: ClassificationValue[] = [];

  constructor(private readonly metaDataService: MetaDataService) {}

  ngOnInit(): void {
    console.log("ngOnInit");
    this.metaDataService.getMetaDataClassification().subscribe((classification: Classification) => {
      this.values = classification.value;
      console.log(this.values);
      this.isLoading = false;
    });
  }


  protected readonly map = map;

  getChildrenName(values: SupportedOperation[]) {
    return values.map((c) => { return c.name});
  }
}
