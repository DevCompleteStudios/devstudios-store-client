import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-auth-login',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './auth-login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthLoginComponent { }
