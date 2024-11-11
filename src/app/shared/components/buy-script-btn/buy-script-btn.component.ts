import { ChangeDetectionStrategy, Component, Input, signal } from '@angular/core';
import { StoreService } from '../../../services/store.service';
import { AuthService } from '../../../services/auth.service';
import { finalize } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@Component({
  selector: 'buy-script-btn',
  standalone: true,
  imports: [MatProgressSpinnerModule],
  templateUrl: './buy-script-btn.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BuyScriptBtnComponent {

  protected showModalLogin = signal(false);
  protected isLoadingBuying = signal(false);
  protected err = signal<string | undefined>(undefined);

  @Input({required: true})
  public id!:number;


  constructor(
    private storeService: StoreService,
    private authService: AuthService,
  ){}


  buyScript(){
    this.isLoadingBuying.set(true);

    this.storeService.buyScript(this.id!, this.authService.getToken!)
      .pipe(
        finalize( () => this.isLoadingBuying.set(false) )
      )
      .subscribe({
        next: (data) => window.location.href = data.data,
        error: (error) => {
          if( error.error && error.error.status && error.error.status === 401 ){
            // error de token caducado - mostrar modal de token caducado.
            console.log('token caducado');
          } else {
            this.err.set('Unexpected error, please try again later');
          }
        }
      })
  }


  onClick(){
    if( !this.authService.isLogged ){
      this.showModalLogin.set(true);
      console.log('Inicia sesion para continuar');
    }
    else {
      this.buyScript();
    }
  }


}
