import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { IUserDto } from '../../services/interfaces/api/user/IUserDto';
import { AuthService } from '../../services/auth.service';
import { finalize } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';



@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    MatTableModule,
  ],
  templateUrl: './profile.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent implements OnInit {

  protected isLoading = signal(true);
  protected user = signal<IUserDto | undefined>(undefined);
  protected displayedColumns: string[] = ['name', 'date', 'price', 'key', 'status'];
  protected revealKey = new Map<number, boolean>();

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService
      .verifyToken()
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: (data) => this.user.set(data.data),
        error: (error) => {
          console.log(error);
        },
      });
  }

  protected toggleKey(index: number): void {
    this.revealKey.set(index, !this.revealKey.get(index));
  }

}
