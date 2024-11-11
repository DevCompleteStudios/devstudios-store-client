import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { methodPayment } from '../../../services/interfaces/api/store/IScriptPreviewDto.interface';



@Component({
  selector: 'create-script-service',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule],
  templateUrl: './create-script-service.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateScriptServiceComponent {


  protected formAddScript = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(70)]),
    description: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(250)]),
    price: new FormControl('', [Validators.required, Validators.min(1), Validators.max(99)]),
    methodPayment: new FormControl('', [Validators.required]),
    youtubeLink: new FormControl(''),
  });

  protected selectedValue: string = '';
  protected options: methodPayment[] = ['SUBSCRIPTION', 'DEVELOPMENT', 'SUBSCRIPTION_AND_ONE_PAYMENT', 'MAINTENANCE', 'UPDATING'];


}
