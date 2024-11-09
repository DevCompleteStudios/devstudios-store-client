import { Component, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./shared/components/navbar/navbar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {

  showNavbar = signal<boolean>(true);


  constructor(
    private router:Router
  ){
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showNavbar.set(!event.urlAfterRedirects.includes('auth'));
      }
    });
  }


}
