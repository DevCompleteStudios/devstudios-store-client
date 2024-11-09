import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function ValidatePassword():ValidatorFn {

  return( control:AbstractControl ):ValidationErrors | null => {
    const value:string = control.value as string;

    if( !value || value === null || value === undefined ) return null;

    if( value.includes(' ') ){
      return  {
        password: 'Must not include spaces'
      }
    }

    if( value.trim().length <= 4 ){
      return {
        password: 'Password is too short'
      }
    }

    if( value.trim().length >= 50 ){
      return {
        password: 'Password is too long'
      }
    }


    return null;
  };
}
