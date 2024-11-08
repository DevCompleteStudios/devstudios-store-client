import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-admin',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './dashboard-admin.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardAdminComponent { }
