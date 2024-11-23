import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { IScriptPreviewDto } from './interfaces/api/store/IScriptPreviewDto.interface';
import { IResponse } from './interfaces/api/IResponse';
import { IScriptDto } from './interfaces/api/store/IScriptDto.interface';
import { environment } from '../../environments/environment';
import { ICreateScriptServiceDto } from '../shared/components/create-script-service/interfaces/ICreateScriptService.dto';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private url:string = environment.apiUrl + '/scripts';
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

  public addNewScriptService(body: ICreateScriptServiceDto, token: string):Observable<IResponse<IScriptDto>>{
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token.trim()
    });
    return this.http.post<IResponse<IScriptDto>>(this.url + '/create-script', this.toFormData(body), {headers})
      .pipe(
        tap( data => this.scripts.set([...this.scripts(), data.data]) ),
      );
  }


  private toFormData(body: {[key:string]: any}):FormData{
    const form = new FormData();
  
    for( const [key, value] of Object.entries(body) ){
      form.append(key, value);
    }

    return form;
  }

}
