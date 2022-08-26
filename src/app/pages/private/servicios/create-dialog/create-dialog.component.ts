import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Services } from '../_services/servicios.service';

@Component({
  selector: 'app-create-dialog',
  templateUrl: './create-dialog.component.html',
  styleUrls: ['./create-dialog.component.scss']
})
export class CreateDialogComponent implements OnInit {

  newServiceFormGroup!: FormGroup;
  validations!: any;

  constructor(
    private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<CreateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Services
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onClick(): void {
    if (!this.newServiceFormGroup.invalid) {
      this.dialogRef.close(this.newServiceFormGroup.getRawValue());
    } else {
      this.newServiceFormGroup.markAllAsTouched()
    }
  }

  ngOnInit(): void {
    this.newServiceFormGroup = this._formBuilder.group({
      name: [this.data?.name ?? '', [Validators.compose([Validators.required, Validators.pattern('[A-ZÑa-zñÀ-ÿ]+[A-ZÑa-zñÀ-ÿ ]*'), Validators.minLength(3), Validators.maxLength(15)])]],
      id: [this.data?.id ?? '', [Validators.compose([Validators.required, Validators.pattern('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$'), Validators.minLength(3), Validators.maxLength(15)])]],
      description: [this.data?.description ?? '', [Validators.compose([Validators.required, Validators.pattern('[A-ZÑa-zñÀ-ÿ]+[A-ZÑa-zñÀ-ÿ ]*'), Validators.minLength(5), Validators.maxLength(300)])]],
      company: [this.data?.company ?? '', [Validators.compose([Validators.required])]],
      stylist: [this.data?.stylist ?? '', [Validators.compose([Validators.required])]],
    });
    this.getErrorMessage()
  }

  getErrorMessage() {
    this.validations = {
      'name': [
        { type: 'required', message: 'El nombre del servicio es requerido' },
        { type: 'pattern', message: 'Se debe ingresar un nombre válido' },
        { type: 'minlength', message: 'Mínimo 3 caracteres' },
        { type: 'maxlength', message: 'Máximo 15 caracteres' },
      ],
      'id': [
        { type: 'required', message: 'El Número de servicio es requerido' },
        { type: 'pattern', message: 'El Número de servicio no puede contener letras ni caracteres especiales' },
        { type: 'minlength', message: 'Mínimo 5 caracteres' },
        { type: 'maxlength', message: 'Máximo 300 caracteres' },
      ],
      'description': [
        { type: 'required', message: 'La descripción es requerida' },
        { type: 'pattern', message: 'Caracteres especiales prohibidos: <>' },
        { type: 'minlength', message: 'Mínimo 4 caracteres' },
        { type: 'maxlength', message: 'Máximo 30 caracteres' },
      ],
      'company': [
        { type: 'required', message: 'El local es requerido' },
      ],
      'stylist': [
        { type: 'required', message: 'El estilista es requerido' },
      ],
    };
  }

}
