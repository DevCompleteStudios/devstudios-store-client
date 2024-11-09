import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-show-errors',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './show-errors.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShowErrorsComponent {

  @Input()
  public err?: string | string[];



  protected get getErrors():string[]{
    if( typeof this.err === 'string' || !this.err )
      return (this.err)
        ? [this.err]
        : [];

    return this.err;
  }

}
