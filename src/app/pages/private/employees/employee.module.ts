import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeComponent } from './employee.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateDialogComponent } from './create-dialog/create-dialog.component';
import { MaterialModule } from './material.module';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

@NgModule({
  declarations: [
    EmployeeComponent,
    CreateDialogComponent,
    ConfirmDialogComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule.forChild([
      {
        path: '',
        component: EmployeeComponent,
        data: {
          title: 'Employees',
          robots: 'noindex, nofollow',
        },
      },
    ]),
  ],
  entryComponents: [
    CreateDialogComponent,
    ConfirmDialogComponent
  ]
})
export class EmployeeModule { }
