import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { AuthComponent } from "../../shared/components/auth/auth.component";
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { finalize } from 'rxjs';




@Component({
  selector: 'app-auth-register',
  standalone: true,
  imports: [AuthComponent],
  templateUrl: './auth-register.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthRegisterComponent {

  protected isLoading = signal(false);
  protected err = signal<string | string[] | undefined>(undefined);


  constructor(
    private authService: AuthService,
    private router: Router,
  ){}


  onRegister(form: {email: string, password: string}){
    this.authService.register({email: form.email, password: form.password})
      .pipe(
        finalize(() => this.isLoading.set(false))
      )
      .subscribe({
        next: () => {
          this.err.set(undefined);
          this.router.navigate(['/home']);
        },
        error: (error) => {
          console.log(error);
          if( error.error && error.error.err ){
            this.err.set(error.error.err);
            return;
          }
          this.err.set('Unexpected error, please try again later.');
        }
      })
  }

}
