import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { IResponse } from './interfaces/api/IResponse';
import { Observable, tap } from 'rxjs';
import { IResponsePagination } from './interfaces/api/IResponsePagination';
import { IRating } from './interfaces/api/store/IRating.interface';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  protected url: string = "https://devstudios.up.railway.app/api/rating";
  protected coments = signal(new Map<number, IRating[]>());

  constructor(
    private http: HttpClient,
  ){ }


  addComent(id: number, body: { orderId: string; stars: number; content: string }): Observable<IResponse<IRating>> {
    return this.http.post<IResponse<IRating>>(this.url + "/add-coment/" + id, body).pipe(
      tap((data) => {
        const currentComments = this.coments().get(id) || [];
        const newMap = new Map(this.coments());

        // Agregar el nuevo comentario al inicio de la lista
        newMap.set(id, [data.data, ...currentComments]);

        this.coments.set(newMap);
      })
    );
  }

  findComentsByScriptId( id: number, pagination: {page: number, elements: number} ): Observable<IResponsePagination<IRating[]>>{
    return this.http.get<IResponsePagination<IRating[]>>(`${this.url}/get-coments-by-script-id/${id}?page=${pagination.page}&elements=${pagination.elements}`)
      .pipe(
        tap( (data) => {
          const newMap = new Map(this.coments());
          newMap.set(id, data.data);
          this.coments.set(newMap);
        }),
      );
  }

  getComentsByCaching(id: number):IRating[] | undefined{
    return this.coments().get(id);
  }

}
