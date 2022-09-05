import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Path } from '@core/structs';
import { AuthService } from '../_services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '../../../private/user/_services/user.service';

@Component({
  selector: 'app-login',
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
    private _formBuilder: FormBuilder,
  ) {
    this.returnUrl =
      this.activatedRoute.snapshot.queryParamMap.get('returnUrl') ||
      `/${Path.Dashboard}`;

    this.newLoginFormGroup = this._formBuilder.group({
      email: [''],
      password: [''],
    });
  }

  onClickSignIn(): void {
    this.authService.signIn();
    this.router.navigate([this.returnUrl]);
  }

  ngOnInit(): void {
  }
}
