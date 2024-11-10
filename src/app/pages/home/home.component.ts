import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ScriptsStoreComponent } from "../../shared/components/scripts-store/scripts-store.component";



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ScriptsStoreComponent],
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {



}
