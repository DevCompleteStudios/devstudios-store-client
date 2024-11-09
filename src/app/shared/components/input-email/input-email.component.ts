import { ChangeDetectionStrategy, Component, forwardRef, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ControlValueAccessor, FormControl, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { merge } from 'rxjs';




@Component({
  selector: 'input-email',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, MatIconModule],
  templateUrl: './input-email.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputEmailComponent),
    multi: true,
  }]
})
export class InputEmailComponent implements ControlValueAccessor {

  protected email = new FormControl('', [Validators.required, Validators.email]);
  protected emailError = signal('');


  constructor(){
    merge( this.email.statusChanges, this.email.valueChanges )
      .pipe( takeUntilDestroyed() )
      .subscribe(() => {
        this.detectErrors();
        this.onChange(this.email.value);
      });
  }


  onChange = (_: any) => {};
  onTouched = () => {};


  writeValue(value: string): void {
    this.email.setValue(value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    (isDisabled)
    ? this.email.disable()
    : this.email.enable();
  }

  detectErrors(){
    if( this.email.hasError('email') ){
      this.emailError.set('Email is not valid');
    }
  }

  handleInputChange(value: any): void {
    this.email.setValue(value);
    this.onChange(value);
    this.onTouched();
  }

  handleBlur(): void {
    this.onTouched();
  }

}
