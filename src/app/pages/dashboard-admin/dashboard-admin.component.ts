import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CreateScriptServiceComponent } from "../../shared/components/create-script-service/create-script-service.component";
import { CreateSubscriptionComponent } from "../../shared/components/create-subscription/create-subscription.component";



@Component({
  selector: 'app-dashboard-admin',
  standalone: true,
  imports: [CreateScriptServiceComponent, CreateSubscriptionComponent],
  templateUrl: './dashboard-admin.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardAdminComponent {

  constructor(){}


}
