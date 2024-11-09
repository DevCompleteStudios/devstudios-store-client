import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidatePassword } from '../../shared/validators/ValidatePassword';
import { InputEmailComponent } from "../../shared/components/input-email/input-email.component";
import { InputPasswordComponent } from "../../shared/components/input-password/input-password.component";


@Component({
  selector: 'app-auth-login',
  standalone: true,
  imports: [InputEmailComponent, ReactiveFormsModule, InputPasswordComponent],
  templateUrl: './auth-login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthLoginComponent {

  protected form = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('', [Validators.required, ValidatePassword()]),
  });


  onSignIn(){
    if( this.form.invalid ) return;
    const email:string = this.form.controls.email.value!;
    const password:string = this.form.controls.password.value!;

    console.log(email);
    console.log(password);
  }


}
