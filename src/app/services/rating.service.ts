import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IResponse } from './interfaces/api/IResponse';
import { Observable, tap } from 'rxjs';
import { IResponsePagination } from './interfaces/api/IResponsePagination';
import { IRating } from './interfaces/api/store/IRating.interface';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  protected url: string = "http://localhost:3001/api/rating";
  protected coments = new Map<number, IRating[]>();

  constructor(
    private http: HttpClient,
  ){ }


  addComent( id:number, body: {orderId:string, stars:number, content: string} ):Observable<IResponse<IRating>>{
    return this.http.post<IResponse<IRating>>(this.url + "/add-coment/" + id, body)
      .pipe(
        tap( (data) => {
          if( this.coments.has(id) ){
            this.coments.get(id)!.push(data.data);
          }else {
            this.coments.set(id, [data.data]);
          }
        })
      );
  }

  findComentsByScriptId( id: number, pagination: {page: number, elements: number} ): Observable<IResponsePagination<IRating[]>>{
    return this.http.get<IResponsePagination<IRating[]>>(`${this.url}/get-coments-by-script-id/${id}?page=${pagination.page}&elements=${pagination.elements}`)
      .pipe(
        tap( (data) => {
          this.coments.set(id, data.data);
        }),
      );
  }

  getComentsByCaching(id: number):IRating[] | undefined{
    return this.coments.get(id);
  }

}
