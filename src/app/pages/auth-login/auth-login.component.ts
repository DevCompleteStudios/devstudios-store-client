import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { AuthComponent } from "../../shared/components/auth/auth.component";
import { IForm } from '../../shared/components/auth/interfaces/IForm.interface';
import { AuthService } from '../../services/auth.service';
import { finalize } from 'rxjs';
import { Router } from '@angular/router';



@Component({
  selector: 'app-auth-login',
  standalone: true,
  imports: [AuthComponent],
  templateUrl: './auth-login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthLoginComponent {

  protected isLoading = signal(false);
  protected err = signal<string | string[] | undefined>(undefined);


  constructor(
    private authService: AuthService,
    private router: Router,
  ){}


  onLogin( form: IForm ){
    this.isLoading.set(true);

    this.authService.login({email: form.email, password: form.password})
      .pipe(
        finalize(() => this.isLoading.set(false))
      )
      .subscribe({
        next: () => {
          this.err.set(undefined);
          this.router.navigate(['/home']);
        },
        error: (error) => {
          if( error.error && error.error.err ){
            this.err.set(error.error.err);
            return;
          }
          this.err.set('Unexpected error, please try again later.');
        },
      });
  }

}
