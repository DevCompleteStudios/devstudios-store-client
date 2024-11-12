import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';



@Component({
  selector: 'app-payment-succes',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './payment-succes.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentSuccesComponent { }
