import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ValidatePassword } from '../../validators/ValidatePassword';
import { AuthService } from '../../../services/auth.service';
import { finalize, merge } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { InputPasswordComponent } from "../input-password/input-password.component";
import { MatButtonModule } from '@angular/material/button';
import { ShowErrorsComponent } from "../show-errors/show-errors.component";



@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [MatDialogModule, MatFormFieldModule, ReactiveFormsModule, MatInputModule, CommonModule, InputPasswordComponent, MatButtonModule, ShowErrorsComponent],
  templateUrl: './reset-password.component.html',
})
export class ResetPasswordComponent {

  protected codeError = signal<string>("");
  protected form = new FormGroup({
    password: new FormControl("", [Validators.required, ValidatePassword()]),
    code: new FormControl("", [Validators.required, Validators.maxLength(6), Validators.minLength(6)])
  })
  protected err = signal<string>("");
  protected isLoading = signal(false);

  constructor(
    private authService: AuthService,
    public dialogRef: MatDialogRef<ResetPasswordComponent>,
  ){
    merge(this.form.controls.code.statusChanges, this.form.controls.code.valueChanges)
      .pipe( takeUntilDestroyed() )
      .subscribe( () => this.detectCodeErrors() );
  }


  detectCodeErrors(){
    const field = this.form.controls.code;

    if( field.hasError("maxlength") ){
      this.codeError.set("Code is too long");
    } else if( field.hasError("minlength") ){
      this.codeError.set("Code is too short");
    } else {
      this.codeError.set("");
    }
  }

  onSubmit(): void {
    if( this.form.invalid ) {
      return;
    };
    this.isLoading.set(true);
    const code: string = this.form.controls.code.value!;
    const password: string = this.form.controls.password.value!;

    this.authService.onSendCode({code, password})
      .pipe(
        finalize( () => this.isLoading.set(false) )
      )
      .subscribe({
        next: (data) => {},
        error: (error) => {
          if( error.error && error.error.err ){
            this.err.set(error.error.err);
          } else {
            this.err.set("Unexpected error, please try again later");
          }
        },
      })
  }

}
