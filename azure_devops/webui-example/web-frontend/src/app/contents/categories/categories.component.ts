import { Component, OnInit } from '@angular/core';
import {MetaDataService} from "../../common/api/meta-data.service";
import {Category, CategoryValue} from "../../common/model/category";
import {MatTableModule} from "@angular/material/table";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [MatTableModule, MatProgressSpinnerModule],
  providers: [MetaDataService],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {

  public isLoading: boolean = true;

  public displayedColumns: string[] = ['name', 'referenceName', 'defaultWorkItemTypeName', 'workItemTypesName'];
  public categories: CategoryValue[] = [];

  constructor(private readonly metaDataService: MetaDataService) {}

  ngOnInit(): void {
    console.log("ngOnInit");
    this.metaDataService.getMetaDataCategories().subscribe((category: Category) => {
      this.categories = category.value;
      this.isLoading = false;
    });
  }
}
