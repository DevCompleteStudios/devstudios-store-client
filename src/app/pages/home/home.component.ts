import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { StoreService } from '../../services/store.service';
import { IScriptDto, methodPayment } from '../../services/interfaces/api/store/IScript.interface';
import { finalize } from 'rxjs';
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
