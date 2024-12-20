import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { finalize } from 'rxjs';
import { IScriptPreviewDto, methodPayment } from '../../../services/interfaces/api/store/IScriptPreviewDto.interface';
import { StoreService } from '../../../services/store.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ShowErrorsComponent } from "../show-errors/show-errors.component";
import { RouterLink } from '@angular/router';
import { BuyScriptBtnComponent } from "../buy-script-btn/buy-script-btn.component";
import { SlicePipe } from '@angular/common';


@Component({
  selector: 'app-scripts-store',
  standalone: true,
  imports: [MatProgressSpinnerModule, ShowErrorsComponent, RouterLink, BuyScriptBtnComponent, SlicePipe],
  templateUrl: './scripts-store.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScriptsStoreComponent {

  protected page = signal(0);
  protected elements = signal(10);
  protected isLoading = signal(false);
  protected err = signal<string | string[] | undefined>(undefined);

  protected scriptsStore = signal<IScriptPreviewDto[]>([]);


  constructor(
    private storeService: StoreService,
  ){
    this.searchScripts();
  }


  searchScripts(){
    this.isLoading.set(true);
    this.storeService.getAllScripts(this.page(), this.elements())
      .pipe(
        finalize( () => this.isLoading.set(false))
      )
      .subscribe({
        next: (data) => this.scriptsStore.set([...this.scriptsStore(), ...data.data]),
        error: (error) => this.err.set('Unexpected error, please try again later'),
      })
  }

  getPaymentBadgeInfo(method: methodPayment){
    const badges = {
      'SUBSCRIPTION_AND_ONE_PAYMENT': { label: 'Subscription & One-time', color: 'bg-purple-500' },
      'SUBSCRIPTION': { label: 'Subscription Only', color: 'bg-blue-500' },
      'ONE_PAYMENT': { label: 'One-time Purchase', color: 'bg-green-500' },
      'DEVELOPMENT': { label: 'In Development', color: 'bg-yellow-500' },
      'MAINTENANCE': { label: 'Under Maintenance', color: 'bg-orange-500' },
      'UPDATING': { label: 'Updating', color: 'bg-cyan-500' }
    }
    return badges[method] || { label: method, color: 'bg-gray-500' };
  };

  formatDate(date: Date):string {
    return new Date(date).toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric'
    });
  }

  isAvailableInPaymeny( script: IScriptPreviewDto ){
    return script.isActive
      &&
    script.methodPayment !== 'SUBSCRIPTION';
  }

}

