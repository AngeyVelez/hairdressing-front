import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '../_services/user.service';

@Component({
  selector: 'app-create-dialog',
  templateUrl: './create-dialog.component.html',
  styleUrls: ['./create-dialog.component.scss']
})
export class CreateDialogComponent implements OnInit {

  newUserFormGroup!: FormGroup;
  validations!: any;

  constructor(
    private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<CreateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onClick(): void {
    if (!this.newUserFormGroup.invalid) {
      this.dialogRef.close(this.newUserFormGroup.getRawValue());
    } else {
      this.newUserFormGroup.markAllAsTouched()
    }
  }

  ngOnInit(): void {
    this.newUserFormGroup = this._formBuilder.group({
      name: [this.data?.name ?? '', [Validators.compose([Validators.required, Validators.pattern('[A-ZÑa-zñÀ-ÿ]+[A-ZÑa-zñÀ-ÿ ]*'), Validators.minLength(3), Validators.maxLength(15)])]],
      lastname: [this.data?.lastname ?? '', [Validators.compose([Validators.required, Validators.pattern('[A-ZÑa-zñÀ-ÿ]+[A-ZÑa-zñÀ-ÿ ]*'), Validators.minLength(3), Validators.maxLength(15)])]],
      username: [this.data?.username ?? '', [Validators.compose([Validators.required, Validators.pattern('[A-ZÑa-zñÀ-ÿ]+[A-ZÑa-zñÀ-ÿ ]*'), Validators.minLength(3), Validators.maxLength(15)])]],
      date: [this.data?.date ?? '', [Validators.compose([Validators.required, Validators.pattern('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$'), Validators.minLength(3), Validators.maxLength(15)])]],
      email: [this.data?.email ?? '', [Validators.compose([Validators.required, Validators.pattern('[ÑA-Zña-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})'), Validators.minLength(4), Validators.maxLength(30)])]],
      gender: [this.data?.gender ?? '', [Validators.compose([Validators.required, Validators.pattern('[A-ZÑa-zñÀ-ÿ]+[A-ZÑa-zñÀ-ÿ ]*'), Validators.minLength(3), Validators.maxLength(15)])]],
      image: [this.data?.image ?? '', [Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(100)])]],
      password: [this.data?.password ?? '', [Validators.compose([Validators.required, Validators.pattern(''), Validators.minLength(6), Validators.maxLength(15)])]],
      phone: [this.data?.phone ?? '', [Validators.compose([Validators.required, Validators.pattern('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$'), Validators.minLength(3), Validators.maxLength(30)])]],
      website: [this.data?.website ?? '', [Validators.compose([Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?'), Validators.minLength(4), Validators.maxLength(30)])]],
    });
    this.getErrorMessage()
  }

  getErrorMessage() {
    this.validations = {
      'name': [
        { type: 'required', message: 'El nombre es requerido' },
        { type: 'pattern', message: 'Se debe ingresar un nombre válido' },
        { type: 'minlength', message: 'Mínimo 3 caracteres' },
        { type: 'maxlength', message: 'Máximo 15 caracteres' },
      ],
      'lastname': [
        { type: 'required', message: 'El apellido es requerido' },
        { type: 'pattern', message: 'El apellido debe ser alfanumérico' },
        { type: 'minlength', message: 'Mínimo 3 caracteres' },
        { type: 'maxlength', message: 'Máximo 15 caracteres' },
      ],
      'username': [
        { type: 'required', message: 'El nombre de usuario es requerido' },
        { type: 'pattern', message: 'El nombre de usuario debe ser alfanumérico' },
        { type: 'minlength', message: 'Mínimo 3 caracteres' },
        { type: 'maxlength', message: 'Máximo 15 caracteres' },
      ],
      'date': [
        { type: 'required', message: 'La fecha de nacimiento es requerida' },
        { type: 'pattern', message: 'La fecha debe ser numerica' },
        { type: 'minlength', message: 'Mínimo 3 caracteres' },
        { type: 'maxlength', message: 'Máximo 15 caracteres' },
      ],
      'email': [
        { type: 'required', message: 'El correo electrónico es requerido' },
        { type: 'pattern', message: 'Se debe ingresar un correo electrónico válido' },
        { type: 'minlength', message: 'Mínimo 4 caracteres' },
        { type: 'maxlength', message: 'Máximo 30 caracteres' },
      ],
      'gender': [
        { type: 'required', message: 'El genero es requerido' },
        { type: 'pattern', message: 'Se debe ingresar un genero válido' },
        { type: 'minlength', message: 'Mínimo 3 caracteres' },
        { type: 'maxlength', message: 'Máximo 30 caracteres' },
      ],
      'image': [
        { type: 'required', message: 'La foto de perfil es requerida' },
        { type: 'pattern', message: 'Se debe ingresar un formato valido' },
        { type: 'minlength', message: 'Mínimo 3 caracteres' },
        { type: 'maxlength', message: 'Máximo 30 caracteres' },
      ],
      'password': [
        { type: 'required', message: 'La contraseña es requerida' },
        { type: 'pattern', message: 'Se debe ingresar una contraseña valida' },
        { type: 'minlength', message: 'Mínimo 6 caracteres' },
        { type: 'maxlength', message: 'Máximo 15 caracteres' },
      ],
      'phone': [
        { type: 'required', message: 'El teléfono es requerido' },
        { type: 'pattern', message: 'El teléfono debe ser numérico' },
        { type: 'minlength', message: 'Mínimo 3 caracteres' },
        { type: 'maxlength', message: 'Máximo 30 caracteres' },
      ],
      'website': [
        { type: 'required', message: 'El sitio web es requerido' },
        { type: 'pattern', message: 'El sitio web debe ser una url' },
        { type: 'minlength', message: 'Mínimo 4 caracteres' },
        { type: 'maxlength', message: 'Máximo 30 caracteres' },
      ],
    };
  }

}
