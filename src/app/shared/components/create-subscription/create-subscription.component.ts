import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'create-subscription',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, MatInputModule, MatButtonModule],
  templateUrl: './create-subscription.component.html'
})
export class CreateSubscriptionComponent {

}
