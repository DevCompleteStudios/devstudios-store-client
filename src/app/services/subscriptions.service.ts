import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { ISubscriptionDto } from './interfaces/api/store/ISubscriptionDto.interface';
import { Observable, tap } from 'rxjs';
import { IResponse } from './interfaces/api/IResponse';
import { environment } from '../../environments/environment';
import { ICreateSubscriptionDto } from '../shared/components/create-subscription/interfaces/ICreateSubscription.dto';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionsService {

  private url: string = environment.apiUrl + '/subscriptions';
  private subscriptions = signal<ISubscriptionDto[] | undefined>(undefined);

  constructor(
    private http: HttpClient
  ){}


  public get findAll():Observable<IResponse<ISubscriptionDto[]>>{
    return this.http.get<IResponse<ISubscriptionDto[]>>(`${this.url}/get-all`)
      .pipe(
        tap( data => this.subscriptions.set(data.data) )
      );
  }

  public get getByCaching(): ISubscriptionDto[] | undefined{
    return this.subscriptions();
  }

  public buyById( id: number, token: string ):Observable<IResponse<string>>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
    return this.http.get<IResponse<string>>(`${this.url}/buy/${id}`, {headers});
  }


  public addSubscription( body: ICreateSubscriptionDto, token: string ){
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });
    return this.http.post<IResponse<ISubscriptionDto>>(this.url + '/create', body, {headers})
      .pipe(
        tap( dat => this.subscriptions.set([...this.subscriptions() ?? [], dat.data]) ),
      )
  }

}
