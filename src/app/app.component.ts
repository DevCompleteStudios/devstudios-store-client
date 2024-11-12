import { Component, OnInit, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./shared/components/navbar/navbar.component";
import { AuthService } from './services/auth.service';
import { finalize } from 'rxjs';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, MatProgressSpinner],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {

  protected showNavbar = signal<boolean>(true);
  protected isLoading = signal(true);


  constructor(
    private router:Router,
    private authService: AuthService,
  ){
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showNavbar.set(!event.urlAfterRedirects.includes('auth'));
      }
    });
  }


  ngOnInit(): void {
    if( this.authService.isLogged ){
      this.authService.verifyToken()
        .pipe(
          finalize(() => this.isLoading.set(false))
        )
        .subscribe({
          error: () => this.authService.logout(),
        })
    } else {
      this.isLoading.set(false);
    }
  }


}
