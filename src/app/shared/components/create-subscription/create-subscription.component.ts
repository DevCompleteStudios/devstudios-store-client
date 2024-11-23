import { Component, Input, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { finalize, merge } from 'rxjs';
import { SubscriptionsService } from '../../../services/subscriptions.service';
import {MatListModule} from '@angular/material/list';
import { ICreateSubscriptionDto } from './interfaces/ICreateSubscription.dto';
import { AuthService } from '../../../services/auth.service';
import { ShowErrorsComponent } from "../show-errors/show-errors.component";
import { MatIconModule } from '@angular/material/icon';
import { ISubscriptionDto } from '../../../services/interfaces/api/store/ISubscriptionDto.interface';

@Component({
  selector: 'create-subscription',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, MatInputModule, MatButtonModule, MatProgressSpinner, MatListModule, ShowErrorsComponent, MatIconModule],
  templateUrl: './create-subscription.component.html'
})
export class CreateSubscriptionComponent implements OnInit {

  ngOnInit(): void {
    if( this.subscription ){
      const controls = this.form.controls;

      controls.price.setValue(this.subscription.price);
      controls.daysDuration.setValue(this.subscription.daysDuration);
      controls.name.setValue(this.subscription.name);
      controls.description.setValue(this.subscription.description);
      this.content.set(this.subscription.content);
    }
  }

  @Input({required: false})
  public subscription?:ISubscriptionDto;

  protected form = new FormGroup({
    price: new FormControl(0, [Validators.required, Validators.min(1), Validators.max(99)]),
    name: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]),
    description: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(250)]),
    daysDuration: new FormControl(7, [Validators.required, Validators.min(1), Validators.max(365)]),
  })
  
  protected content = signal<string[]>([]);
  protected priceErr = signal<string | undefined>(undefined);
  protected nameErr = signal<string | undefined>(undefined);
  protected descriptionErr = signal<string | undefined>(undefined);
  protected daysErr = signal<string | undefined>(undefined);

  protected isLoading = signal(false);
  protected currentBenefit = new FormControl('', [Validators.required]);
  protected err = signal<string | string[] | undefined>(undefined);

  constructor(
    private subscriptionsService:SubscriptionsService,
    private authService: AuthService,
  ){
    merge(this.form.statusChanges, this.form.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe( () => this.handleErrors());
  }


  protected handleErrors(){
    const controls = this.form.controls;
    const priceField = controls.price;
    const nameField = controls.name;
    const descriptionField = controls.description;
    const daysField = controls.daysDuration;

    if( priceField.hasError('min') ){
      this.priceErr.set('Price must be than 1');
    }else if( priceField.hasError('max') ){
      this.priceErr.set('Price must be less than 99');
    } else {
      this.priceErr.set(undefined);
    }

    if( daysField.hasError('min') ){
      this.daysErr.set('Days must be than 1');
    }else if( daysField.hasError('max') ){
      this.daysErr.set('Days must be less than 99');
    } else {
      this.daysErr.set(undefined);
    }

    if( nameField.hasError('minlength') ){
      this.nameErr.set('Name is too short');
    }else if( nameField.hasError('maxlength') ){
      this.nameErr.set('Name is too long');
    } else {
      this.nameErr.set(undefined);
    }
  
    if( descriptionField.hasError('minlength') ){
      this.descriptionErr.set('Description is too short');
    }else if( descriptionField.hasError('maxlength') ){
      this.descriptionErr.set('Description is too long');
    } else {
      this.descriptionErr.set(undefined);
    }
  }


  protected onSubmit(){
    if( this.form.invalid || this.content().length <= 0 ) return;

    if( this.subscription ){
      console.log('Actualizando...');
      return;
    }

    const controls = this.form.controls;
    const body:ICreateSubscriptionDto = {
      description: controls.description.value!,
      name: controls.name.value!,
      price: controls.price.value!,
      daysDuration: controls.daysDuration.value!,
      content: this.content(),
    };

    this.isLoading.set(true);
    this.subscriptionsService.addSubscription(body, this.authService.getToken ?? '')
      .pipe(
        finalize( () => this.isLoading.set(false))
      ).subscribe({
        next: () => this.form.reset(),
        error: (err) => {
          if( err.error && err.error.error ){
            this.err.set(err.error.error);
          } else {
            this.err.set('Unexpected error, please try again later');
          }
        }
      })
  }


  addBenefit(){
    if( this.currentBenefit.errors || !this.currentBenefit.value ) return;
    const newlist = [this.currentBenefit.value.trim(), ...this.content()];
    this.content.set(newlist);
    this.currentBenefit.reset();
  }

  removeBenefit(value: string){
    const newList = this.content().filter( content => content !== value );
    this.content.set(newList);
  }

}
