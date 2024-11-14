import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IResponse } from './interfaces/api/IResponse';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  protected url: string = "http://localhost:3001/api/rating";

  constructor(
    private http: HttpClient,
  ){ }


  addComent( id:number, body: {orderId:string, stars:number, content: string} ):Observable<IResponse<boolean>>{
    return this.http.post<IResponse<boolean>>(this.url + "add/coment/" + id, {body});
  }

}
