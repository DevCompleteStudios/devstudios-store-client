import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { IForm } from './interfaces/IForm.interface';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidatePassword } from '../../validators/ValidatePassword';
import { InputEmailComponent } from '../input-email/input-email.component';
import { InputPasswordComponent } from '../input-password/input-password.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    InputPasswordComponent,
    InputEmailComponent,
    MatProgressSpinnerModule
  ],
  templateUrl: './auth.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent {

  protected form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, ValidatePassword()])
  });

  @Input({required: true})
  public title!: string;

  @Input({required: true})
  public subTitle!: string;

  @Input({required: true})
  public btnMessage!: string;

  @Input({required: true})
  public isLoading!:boolean;


  @Output()
  public onSend = new EventEmitter<IForm>();



  onSucces(){
    if( this.form.invalid ) return;
    const email: string = this.form.controls.email.value!;
    const password: string = this.form.controls.password.value!;

    this.onSend.emit({email, password});
  }


}
