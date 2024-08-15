import { Routes } from '@angular/router';
import {HomeComponent} from "./contents/home/home.component";
import {CategoriesComponent} from "./contents/categories/categories.component";
import {FieldsComponent} from "./contents/fields/fields.component";
import {ClassificationComponent} from "./contents/classification/classification.component";
import {StatesComponent} from "./contents/states/states.component";
import {WorkItemsComponent} from "./contents/work-items/work-items.component";

export const routes: Routes = [

  { path: '', component: HomeComponent},
  { path: 'workitems', component: WorkItemsComponent},
  { path: 'categories', component: CategoriesComponent},
  { path: 'fields', component: FieldsComponent},
  { path: 'classification', component: ClassificationComponent},
  { path: 'states', component: StatesComponent},
];
