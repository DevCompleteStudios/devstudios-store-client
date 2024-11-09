import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { AuthComponent } from "../../shared/components/auth/auth.component";
import { IForm } from '../../shared/components/auth/interfaces/IForm.interface';



@Component({
  selector: 'app-auth-login',
  standalone: true,
  imports: [AuthComponent],
  templateUrl: './auth-login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthLoginComponent {

  protected isLoading = signal(false);


  onLogin( form: IForm ){
    console.log('Loggeando...');
  }

}
