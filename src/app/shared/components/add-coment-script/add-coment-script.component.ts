import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';



@Component({
  selector: 'add-coment-script',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatInputModule],
  templateUrl: './add-coment-script.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddComentScriptComponent {

  @Input({required: true})
  scriptId!: number;

}
