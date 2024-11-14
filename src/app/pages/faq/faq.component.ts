import {MatExpansionModule} from '@angular/material/expansion';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [MatExpansionModule, RouterLink],
  templateUrl: './faq.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FaqComponent { }
