import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-view-script',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './view-script.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewScriptComponent {

  constructor(){}

}

