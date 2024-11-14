import { Component, Inject, signal } from '@angular/core';
import { InputEmailComponent } from "../../shared/components/input-email/input-email.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth.service';
import { ShowErrorsComponent } from "../../shared/components/show-errors/show-errors.component";
import { finalize } from 'rxjs';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { ResetPasswordComponent } from "../../shared/components/reset-password/reset-password.component";
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [InputEmailComponent, ReactiveFormsModule, MatButtonModule, ShowErrorsComponent, MatProgressSpinner, ResetPasswordComponent],
  templateUrl: './forgot-password.component.html',
})
export class ForgotPasswordComponent {

  protected formEmail = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
  });
  protected err = signal<string | undefined>(undefined);
  protected showModal = signal<boolean>(false);
  protected isLoading = signal(false);

  constructor(
    private authService:AuthService,
    private dialog: MatDialog,
  ){}


  onResetPassword(){
    if( this.formEmail.invalid ) return;
    this.isLoading.set(true);
    const field:string = this.formEmail.controls.email.value!;

    this.authService.onResetPassword({email: field})
      .pipe( 
        finalize( () => this.isLoading.set(false))
      )
      .subscribe({
        next: () => {
          this.showModal.set(true);
          this.dialog.open(ResetPasswordComponent);
        },
        error: (err) => {
          if( err.error.err ){
            this.err.set(err.error.err);
          } else {
            this.err.set("Unexpected error, please try again later");
          }
        },
      })
  }

}
