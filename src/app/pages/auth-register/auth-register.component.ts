import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { AuthComponent } from "../../shared/components/auth/auth.component";




@Component({
  selector: 'app-auth-register',
  standalone: true,
  imports: [AuthComponent],
  templateUrl: './auth-register.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthRegisterComponent {

  protected isLoading = signal(false);


  onRegister(form: {email: string, password: string}){
    console.log('Registrando cuenta...');
  }

}
