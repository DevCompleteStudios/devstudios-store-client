import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { merge } from 'rxjs';
import { ValidatePassword } from '../../shared/validators/ValidatePassword';


@Component({
  selector: 'app-auth-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, MatIconModule],
  templateUrl: './auth-login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthLoginComponent {

  protected form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, ValidatePassword()]),
  });

  protected emailError = signal('');
  protected passwordError = signal('');
  protected hide = signal(true);


  constructor(){
    merge(this.form.statusChanges, this.form.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.detectErrors());
  }


  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  detectErrors(){
    const emailField = this.form.controls.email;
    const passField = this.form.controls.password;

    if( emailField.hasError('email') ){
      this.emailError.set('Email is not valid');
    } else {
      this.emailError.set('');
    }

    console.log(passField.errors);

    if( passField.hasError('password') ){
      const err: string = passField.getError('password');
      this.passwordError.set(err);
    } else {
      this.passwordError.set('');
    }
  }


}
