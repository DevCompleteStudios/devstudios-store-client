import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { SubscriptionsService } from '../../services/subscriptions.service';
import { ISubscriptionDto } from '../../services/interfaces/api/store/ISubscriptionDto.interface';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ShowErrorsComponent } from "../../shared/components/show-errors/show-errors.component";
import { finalize } from 'rxjs';
import { CurrencyPipe } from '@angular/common';
import { BuyScriptBtnComponent } from "../../shared/components/buy-script-btn/buy-script-btn.component";


@Component({
  selector: 'app-subscriptions',
  standalone: true,
  imports: [MatProgressSpinnerModule, ShowErrorsComponent, CurrencyPipe, BuyScriptBtnComponent],
  templateUrl: './subscriptions.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubscriptionsComponent {

  protected isLoading = signal<Boolean>(true);
  protected err = signal<string | undefined>(undefined);
  protected subscriptions = signal<ISubscriptionDto[] | undefined>(undefined);

  constructor(
    private subscriptionsService: SubscriptionsService,
  ){
    this.loadData();
  }


  private loadData(){
    if( this.subscriptionsService.getByCaching ){
      this.subscriptions.set(this.subscriptionsService.getByCaching);
      this.isLoading.set(false);
      return;
    }

    this.subscriptionsService.findAll
      .pipe(
        finalize( () => this.isLoading.set(false) )
      )
      .subscribe({
        next: (data) => this.subscriptions.set(data.data),
        error: () => this.err.set('Unexpected error, please reload server'),
      });
  }

}

