import { ChangeDetectionStrategy, Component, Input, OnInit, signal } from '@angular/core';
import { IRating } from '../../../services/interfaces/api/store/IRating.interface';
import { RatingService } from '../../../services/rating.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ShowErrorsComponent } from "../show-errors/show-errors.component";
import { finalize } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule, DatePipe } from '@angular/common';
import { AddComentScriptComponent } from "../add-coment-script/add-coment-script.component";



@Component({
  selector: 'app-show-rating',
  standalone: true,
  imports: [MatProgressSpinnerModule, ShowErrorsComponent, MatIconModule, DatePipe, CommonModule, AddComentScriptComponent],
  templateUrl: './show-rating.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShowRatingComponent implements OnInit {

  @Input({required: true})
  public scriptId!: number;

  protected rating = signal<IRating[]>([]);
  protected currentPage = signal(0);
  protected elementsByPage = signal(10);
  protected maxPage = signal(0);
  protected isLoading = signal(true);
  protected err = signal<string | undefined>(undefined);


  constructor(
    private ratingService: RatingService,
  ){}

  ngOnInit(): void {
    this.findComents();
  }


  findComents(){
    const cache = this.ratingService.getComentsByCaching(this.scriptId);

    if( cache !== undefined ){
      this.rating.set(cache);
      this.isLoading.set(false);
    } else {
      this.ratingService.findComentsByScriptId(this.scriptId, {elements: this.elementsByPage(), page: this.currentPage()})
        .pipe(
          finalize( () => this.isLoading.set(false) )
        )
        .subscribe({
          next: (data) => this.rating.set(data.data),
          error: (error) => {
            this.err.set('Unexpected error, please try again later');
            console.log(error);
          }
        })
    }
  }

  get getStarsArray():number[]{
    return new Array(5).fill(0);
  }

}

