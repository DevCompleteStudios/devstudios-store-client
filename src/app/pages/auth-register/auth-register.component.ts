import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-auth-register',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './auth-register.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthRegisterComponent { }
