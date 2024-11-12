import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { StoreService } from '../../services/store.service';
import { ActivatedRoute } from '@angular/router';
import { IScriptDto } from '../../services/interfaces/api/store/IScriptDto.interface';
import { finalize } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ShowErrorsComponent } from "../../shared/components/show-errors/show-errors.component";
import { MatIconModule } from '@angular/material/icon';
import { BuyScriptBtnComponent } from "../../shared/components/buy-script-btn/buy-script-btn.component";
import { CurrencyPipe } from '@angular/common';
import { AddComentScriptComponent } from "../../shared/components/add-coment-script/add-coment-script.component";

@Component({
  selector: 'app-view-script',
  standalone: true,
  imports: [MatProgressSpinnerModule, ShowErrorsComponent, MatIconModule, BuyScriptBtnComponent, CurrencyPipe, MatIconModule, AddComentScriptComponent, MatIconModule],
  templateUrl: './view-script.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewScriptComponent implements OnInit {

  protected id = signal<number | undefined>(undefined);
  protected isLoading = signal(true);
  protected err = signal<string | string[] | undefined>(undefined);
  protected script = signal<IScriptDto | undefined>(undefined);


  constructor(
    private storeService: StoreService,
    private route:ActivatedRoute,
  ){}

  ngOnInit(): void {
    this.route.params
      .subscribe(params => {
        const id = params['id'];
        this.id.set(id);
        this.searchScript();
      });
  }

  searchScript(){
    const script:IScriptDto | undefined = this.storeService.getScriptsCache.find( s => +s.id! === +this.id()! );
    if( script ){
      this.isLoading.set(false);
      this.script.set(script);
      return;
    }

    this.storeService.findById(this.id()!)
      .pipe(
        finalize( () => this.isLoading.set(false) )
      )
      .subscribe({
        error: (error) => {
          console.log(error);
          if( error.error && error.error.err ){
            this.err.set(`Script with id: ${this.id()} not found`);
            return;
          }
          this.err.set('Unexpected error, please try again later.');
        },
        next: (data) => this.script.set(data.data),
      })
  }

  formatDate( date:Date ):string{
    return new Date(date).toLocaleDateString('en-US')
  }

  get getStarsMedium(): number{
    if( !this.script() || this.script()!.ratings.length < 1 ) return 0;

    let medium = 0;
    this.script()!.ratings.forEach( s => medium += s.stars );
    return medium / this.script()!.ratings.length;
  }

  get isAvailablePayment():Boolean {
    return this.script() !== undefined
      && this.script()!.isActive
      &&
      (this.script()!.methodPayment === 'SUBSCRIPTION_AND_ONE_PAYMENT'
          ||
        this.script()!.methodPayment === 'ONE_PAYMENT');
  }

}

