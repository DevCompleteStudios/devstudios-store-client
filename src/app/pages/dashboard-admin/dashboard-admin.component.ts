import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CreateScriptServiceComponent } from "../../shared/components/create-script-service/create-script-service.component";



@Component({
  selector: 'app-dashboard-admin',
  standalone: true,
  imports: [CreateScriptServiceComponent],
  templateUrl: './dashboard-admin.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardAdminComponent {

  constructor(){}


}
