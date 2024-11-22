import { ChangeDetectionStrategy, Component, Input, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { methodPayment } from '../../../services/interfaces/api/store/IScriptPreviewDto.interface';
import { ICreateScriptServiceDto } from './interfaces/ICreateScriptService.dto';
import { merge } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UploadImagesComponent } from "../upload-images/upload-images.component";



@Component({
  selector: 'create-script-service',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, ReactiveFormsModule, UploadImagesComponent],
  templateUrl: './create-script-service.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateScriptServiceComponent implements OnInit {
  ngOnInit(): void {
    if( this.script ){
      const controls = this.formAddScript.controls;

      controls.description.setValue(this.script.description);
      controls.methodPayment.setValue(this.script.methodPayment);
      controls.name.setValue(this.script.name);
      controls.price.setValue(this.script.price);
      controls.youtubeLink.setValue(this.script.youtubeLink);
    }
  }
  
  @Input({required: false})
  public script?: ICreateScriptServiceDto;

  protected formAddScript = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(70)]),
    description: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(250)]),
    price: new FormControl(0, [Validators.required, Validators.min(1), Validators.max(99)]),
    methodPayment: new FormControl('', [Validators.required]),
    youtubeLink: new FormControl<string | undefined>(undefined),
  });

  protected selectedValue: string = '';
  protected options: methodPayment[] = ['SUBSCRIPTION', 'DEVELOPMENT', 'SUBSCRIPTION_AND_ONE_PAYMENT', 'MAINTENANCE', 'UPDATING'];

  protected nameErr = signal<string | undefined>(undefined);
  protected descriptionErr = signal<string | undefined>(undefined);
  protected priceErr = signal<string | undefined>(undefined);
  protected methodPaymentErr = signal<string | undefined>(undefined);
  protected youtubelinkErr = signal<string | undefined>(undefined);


  constructor(){
    merge(this.formAddScript.statusChanges, this.formAddScript.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe( () => this.handleErrors());
  }


  protected handleErrors(){
    const controls = this.formAddScript.controls;

    const nameField = controls.name;
    const descriptionField = controls.description;
    const priceField = controls.price;
    const methodField = controls.methodPayment;
  
    if( nameField.hasError('minlength') ){
      this.nameErr.set('Name is too short');
    } else if( nameField.hasError('maxlength') ){
      this.nameErr.set('Name is too long');
    } else {
      this.nameErr.set(undefined);
    }

    if(descriptionField.hasError('minlength')){
      this.descriptionErr.set('Description is too short');
    }else if( descriptionField.hasError('maxlength') ){
      this.descriptionErr.set('Description is too long');
    } else {
      this.descriptionErr.set(undefined);
    }

    if(priceField.hasError('min')){
      this.priceErr.set('Price must be greater than 1')
    }else if( priceField.hasError('max') ){
      this.priceErr.set('Price must be less than 99');
    } else {
      this.priceErr.set(undefined);
    }

    if( methodField.hasError('required') ){
      this.methodPaymentErr.set('Method payment is required');
    } else {
      this.methodPaymentErr.set(undefined);
    }
  }

  protected onSubmit(){
    if( this.script ){
      console.log("Actualizando...");
    } else {
      console.log("Creando...");
    }
  }

}
