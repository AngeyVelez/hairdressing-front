import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SignInComponent } from './sign-in.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';

@NgModule({
  declarations: [
    SignInComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule.forChild([
      {
        path: '',
        component: SignInComponent,
        data: {
          title: 'Iniciar Sesión',
          robots: 'index, follow',
        },
      },
    ]),
  ],
})
export class SignInModule {}
