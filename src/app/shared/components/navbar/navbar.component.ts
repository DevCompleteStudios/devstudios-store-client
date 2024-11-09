import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ILink } from './interfaces/ILink.interface';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {

  protected isOpen = false;

  protected links:ILink[] = [
    {
      link: 'support',
      name: 'Support'
    },
    {
      link: 'faq',
      name: 'F.A.Q.'
    },
    {
      link: 'terms',
      name: 'Terms'
    },
    {
      link: 'subscriptions',
      name: 'Subscriptions'
    },
  ];


  constructor(
    private authService: AuthService,
    private router:Router,
  ){}


  protected get isLogged():boolean{
    return this.authService.isLogged;
  }

  protected onLogout(){
    this.authService.logout();
  }

}
