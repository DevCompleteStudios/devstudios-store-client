import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { IScriptPreviewDto } from './interfaces/api/store/IScriptPreviewDto.interface';
import { IResponse } from './interfaces/api/IResponse';
import { IScriptDto } from './interfaces/api/store/IScriptDto.interface';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private url:string = 'http://localhost:3001/api/scripts';
  private scripts = signal<IScriptDto[]>([]);



  constructor(
    private http: HttpClient,
  ){}


  public getAllScripts(page:number, elements: number): Observable<IResponse<IScriptPreviewDto[]>>{
    return this.http.get<IResponse<IScriptPreviewDto[]>>(`${this.url}/find-all?page=${page}&elements=${elements}`);
  }

  public get getScriptsCache():IScriptDto[]{
    return this.scripts();
  }

  public findById(id: number):Observable<IResponse<IScriptDto>>{
    console.log(id);
    return this.http.get<IResponse<IScriptDto>>(`${this.url}/find-by-id/${id}`)
      .pipe(
        tap( data => this.scripts.set([...this.scripts(), data.data]) ),
      );
  }

  public buyScript( id:number, token: string ): Observable<IResponse<string>> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<IResponse<string>>(`${this.url}/buy-script/${id}`, {headers});
  }

}
