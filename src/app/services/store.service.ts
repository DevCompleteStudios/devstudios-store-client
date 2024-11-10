import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IScriptDto } from './interfaces/api/store/IScript.interface';
import { IResponse } from './interfaces/api/IResponse';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private route:string = 'http://localhost:3001/api/scripts'



  constructor(
    private http: HttpClient,
  ){}


  public getAllScripts(page:number, elements: number): Observable<IResponse<IScriptDto[]>>{
    return this.http.get<IResponse<IScriptDto[]>>(`${this.route}/find-all?page=${page}&elements=${elements}`);
  }

}
