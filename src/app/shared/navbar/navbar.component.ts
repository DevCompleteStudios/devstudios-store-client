import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ILink } from './interfaces/ILink.interface';

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
  ];

}
