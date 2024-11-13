import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IPurchase } from './interfaces/IPurchase';
import { MatTableModule } from '@angular/material/table';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ShowErrorsComponent } from "../show-errors/show-errors.component";



@Component({
  selector: 'view-details-purchases',
  standalone: true,
  imports: [MatTableModule, CurrencyPipe, DatePipe, RouterLink, ShowErrorsComponent],
  templateUrl: './view-details-purchases.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewDetailsPurchasesComponent {

  @Input({required: true})
  public purchases: IPurchase[] = [];

  protected displayedColumns: string[] = ['Name', 'Amount', 'Order-Id', 'Key', 'Is-Active', 'Date-Expired'];

}


