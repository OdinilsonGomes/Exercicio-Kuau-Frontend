import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { transferenciaModel } from './../../Model/transferenciaModel';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TransferenciaService {

  constructor(private http: HttpClient) { }

  private readonly urlbase= environment['endPoint'];

  getAllTransferencia(): Observable<transferenciaModel[]>{
    var a = this.http.get<transferenciaModel[]>(`${this.urlbase}/${"transferencia"}`);
    return a;
   }

   excluirTransferencia(id): Observable<transferenciaModel>{
    var a = this.http.delete<any>(`${this.urlbase}/${"transferencia"}/${id}`);
    return a;
   }

   salvarTransferencia(transferenciaModel): Observable<transferenciaModel>{

    var a = this.http.post<any>(`${this.urlbase}/${"transferencia"}`,transferenciaModel);
    console.log(a);
   return a;
   }

}
