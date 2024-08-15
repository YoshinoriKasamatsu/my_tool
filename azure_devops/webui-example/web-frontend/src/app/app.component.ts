import {Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink, RouterOutlet} from '@angular/router';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatInputModule} from '@angular/material/input';
import {DataOperationService} from "./common/api/data-operation.service";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatToolbarModule,
    MatSidenavModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    RouterLink,
    MatProgressSpinnerModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'web-frontend';
  options = this._formBuilder.group({
    bottom: 0,
    fixed: false,
    top: 0,
  });

  public isLoading: boolean = false;

  constructor(private readonly dataOperationService: DataOperationService, private _formBuilder: FormBuilder) {}

  onClickLoadData() {
    this.isLoading = true;
    this.dataOperationService.postExecuteDataUpdate().subscribe(() => {
      this.isLoading = false;
      console.log("更新完了")
    });
  }

}
