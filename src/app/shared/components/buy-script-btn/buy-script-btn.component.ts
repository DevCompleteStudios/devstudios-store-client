import { ChangeDetectionStrategy, Component, Input, signal } from '@angular/core';
import { StoreService } from '../../../services/store.service';
import { AuthService } from '../../../services/auth.service';
import { finalize } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { method } from './interfaces/ITypePayment';
import { SubscriptionsService } from '../../../services/subscriptions.service';


@Component({
  selector: 'buy-script-btn',
  standalone: true,
  imports: [MatProgressSpinnerModule],
  templateUrl: './buy-script-btn.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BuyScriptBtnComponent {

  protected isLoadingBuying = signal(false);
  protected err = signal<string | undefined>(undefined);

  @Input({required: true})
  public id!:number;

  @Input({required: true})
  public method!: method;


  constructor(
    private storeService: StoreService,
    private authService: AuthService,
    private router: Router,
    private subscriptionsService:SubscriptionsService,
  ){}


  onBuy(){
    if( !this.authService.isLogged ){
      this.router.navigate(['/auth/login']);
      return;
    }

    if( this.method === 'SCRIPT' ){
      this.buyScript();
    } else {
      this.buySubscription();
    }
  }

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
          } else {
            this.err.set('Unexpected error, please try again later');
          }
        }
      })
  }

  buySubscription(){
    this.isLoadingBuying.set(true);

    this.subscriptionsService.buyById(this.id, this.authService.getToken!)
      .pipe(
        finalize( () => this.isLoadingBuying.set(false) )
      )
      .subscribe({
        next: (data) => window.location.href = data.data,
        error: (error) => {
          if( error.error && error.error.status && error.error.status === 401 ){
          } else {
            this.err.set('Unexpected error, please try again later');
          }
        }
      })
  }


}
