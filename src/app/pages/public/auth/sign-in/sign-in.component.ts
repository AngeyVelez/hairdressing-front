import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Path } from '@core/structs';
import { AuthService } from '../_services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '../../../private/user/_services/user.service';

@Component({
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  returnUrl!: string;
  validations!: any;
  newLoginFormGroup!: FormGroup;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    //private _formBuilder: FormBuilder,
    //public dialogRef: MatDialogRef<SignInComponent>,
    //@Inject(MAT_DIALOG_DATA) public data: User
  ) {
    this.returnUrl =
      this.activatedRoute.snapshot.queryParamMap.get('returnUrl') ||
      `/${Path.Dashboard}`;
  }

  onClickSignIn(): void {
    this.authService.signIn();
    this.router.navigate([this.returnUrl]);
  }

  ngOnInit(): void {
    /*this.newLoginFormGroup = this._formBuilder.group({
      email: [this.data?.email ?? '', [Validators.compose([Validators.required, Validators.pattern('[ÑA-Zña-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})'), Validators.minLength(4), Validators.maxLength(30)])]],
      password: [this.data?.password ?? '', [Validators.compose([Validators.required, Validators.pattern(''), Validators.minLength(6), Validators.maxLength(15)])]],
    });
    this.getErrorMessage()*/
  }
  /*getErrorMessage() {
    this.validations = {
      'email': [
        { type: 'required', message: 'El correo electrónico es requerido' },
        { type: 'pattern', message: 'Se debe ingresar un correo electrónico válido' },
        { type: 'minlength', message: 'Mínimo 4 caracteres' },
        { type: 'maxlength', message: 'Máximo 30 caracteres' },
      ],
      'password': [
        { type: 'required', message: 'La contraseña es requerida' },
        { type: 'pattern', message: 'Se debe ingresar una contraseña valida' },
        { type: 'minlength', message: 'Mínimo 6 caracteres' },
        { type: 'maxlength', message: 'Máximo 15 caracteres' },
      ],
    };
  }*/
}
