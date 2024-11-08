import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-subscriptions',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './subscriptions.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubscriptionsComponent { }
