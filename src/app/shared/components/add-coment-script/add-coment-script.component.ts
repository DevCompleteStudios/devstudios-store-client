import { ChangeDetectionStrategy, Component, Input, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RatingService } from '../../../services/rating.service';
import { finalize, merge } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ShowErrorsComponent } from "../show-errors/show-errors.component";



@Component({
  selector: 'add-coment-script',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatInputModule, MatButtonModule, MatIconModule, ShowErrorsComponent],
  templateUrl: './add-coment-script.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddComentScriptComponent {

  @Input({required: true})
  scriptId!: number;

  protected form = new FormGroup({
    content: new FormControl("", [Validators.required, Validators.minLength(10), Validators.maxLength(250)]),
    orderId: new FormControl("", [Validators.required, Validators.minLength(5)])
  })

  protected errorContent = signal("");
  protected errorOrderId = signal("");

  protected err = signal<string | undefined>(undefined)
  protected currentStars = signal(5);
  protected isLoading = signal(false);


  constructor(
    private ratingService:RatingService,
  ){
    merge(this.form.statusChanges, this.form.valueChanges)
      .pipe( takeUntilDestroyed() )
      .subscribe( () => this.updateChangesForm() )
  }


  onAddComent(){
    if(this.form.invalid) return;
    this.isLoading.set(true);
    const orderId: string = this.form.controls.orderId.value!;
    const content: string = this.form.controls.content.value!;

    this.ratingService.addComent(this.scriptId, {content, orderId, stars: this.currentStars()})
      .pipe(
        finalize( () => this.isLoading.set(false) )
      )
      .subscribe({
        next: () => {
          this.form.reset();
        },
        error: (error) => {
          if( error.error && error.error.err ){
            this.err.set(error.error.err);
          }else {
            console.log(error);
            this.err.set("Unexpected error, please try again later");
          }
        }
      })
  }



  updateChangesForm(){
    const fieldOrder = this.form.controls.orderId;
    const fieldContent = this.form.controls.content;

    if( fieldOrder.hasError("minlength") ){
      this.errorOrderId.set("Order id is too short");
    } else {
      this.errorOrderId.set("");
    }

    if( fieldContent.hasError("minlength") ){
      this.errorContent.set("Content is too short");
    }else if(fieldContent.hasError("maxlength")){
      this.errorContent.set("Content is too long");
    } else {
      this.errorContent.set("");
    }
  }

  get getMaxStars():number[] {
    return new Array(5).fill(0);
  }

  changeStars( value: number ){
    this.currentStars.set(value + 1);
  }

}
