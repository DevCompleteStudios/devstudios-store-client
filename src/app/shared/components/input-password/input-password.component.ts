import { ChangeDetectionStrategy, Component, forwardRef, signal } from '@angular/core';
import { ControlValueAccessor, FormControl, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidatePassword } from '../../validators/ValidatePassword';
import { merge } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';



@Component({
  selector: 'input-password',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, MatIconModule],
  templateUrl: './input-password.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef( () => InputPasswordComponent ),
    multi: true
  }]
})
export class InputPasswordComponent implements ControlValueAccessor {

  protected password = new FormControl('', [Validators.required, ValidatePassword()]);
  protected passwordError = signal('');

  protected hide = signal(true);


  constructor(){
    merge( this.password.statusChanges, this.password.valueChanges )
      .pipe( takeUntilDestroyed() )
      .subscribe(() => {
        this.detectErrors();
        this.onChange(this.password.value);
      });
  }


  onChange = (_: any) => {};
  onTouched = () => {};


  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  writeValue(value: string): void {
    this.password.setValue(value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    (isDisabled)
    ? this.password.disable()
    : this.password.enable();
  }

  detectErrors(){
    if( this.password.hasError('password') ){
      const value: string = this.password.getError('password');
      this.passwordError.set(value);
    } else {
      this.passwordError.set('');
    }
  }

  handleInputChange(value: any): void {
    this.password.setValue(value);
    this.onChange(value);
    this.onTouched();
  }

  handleBlur(): void {
    this.onTouched();
  }

}
