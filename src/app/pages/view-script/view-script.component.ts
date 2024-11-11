import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { StoreService } from '../../services/store.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IScriptDto } from '../../services/interfaces/api/store/IScriptDto.interface';
import { finalize } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ShowErrorsComponent } from "../../shared/components/show-errors/show-errors.component";
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../services/auth.service';
import { BuyScriptBtnComponent } from "../../shared/components/buy-script-btn/buy-script-btn.component";

@Component({
  selector: 'app-view-script',
  standalone: true,
  imports: [MatProgressSpinnerModule, ShowErrorsComponent, MatIconModule, BuyScriptBtnComponent],
  templateUrl: './view-script.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewScriptComponent implements OnInit {

  protected id = signal<number | undefined>(undefined);
  protected isLoading = signal(true);
  protected err = signal<string | string[] | undefined>(undefined);
  protected script = signal<IScriptDto | undefined>(undefined);


  constructor(
    private storeService: StoreService,
    private route:ActivatedRoute,
    private authService: AuthService,
    private router: Router,
  ){}

  ngOnInit(): void {
    this.route.params
      .subscribe(params => {
        const id = params['id'];
        this.id.set(id);
        this.searchScript();
      });
  }

  searchScript(){
    const script:IScriptDto | undefined = this.storeService.getScriptsCache.find( s => +s.id! === +this.id()! );
    if( script ){
      this.isLoading.set(false);
      this.script.set(script);
      return;
    }

    this.storeService.findById(this.id()!)
      .pipe(
        finalize( () => this.isLoading.set(false) )
      )
      .subscribe({
        error: (error) => {
          console.log(error);
          if( error.error && error.error.err ){
            this.err.set(`Script with id: ${this.id()} not found`);
            return;
          }
          this.err.set('Unexpected error, please try again later.');
        },
        next: (data) => this.script.set(data.data),
      })
  }

  formatDate( date:Date ):string{
    return new Date(date).toLocaleDateString('en-US')
  }




}

