import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { turmaModel } from 'src/app/Model/turmaModel';

@Injectable({
  providedIn: 'root'
})
export class TurmaService {

  headers = new Headers();
  constructor(private http: HttpClient) {
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Authorization', environment.basicAuthorization);
   }
  private readonly urlbase= environment['endPoint'];

  getAllTurma(nome_turma, serie_turma): Observable<turmaModel[]>{
    let params = new HttpParams();
    var a= null;
    if(nome_turma)
      params=params.append("nome_turma",nome_turma);
    if(serie_turma)
      params=params.append("serie_turma",serie_turma);
    if(nome_turma || serie_turma)
      a = this.http.get<turmaModel[]>(`${this.urlbase}/${"turma"}`,{params});
    else
      a = this.http.get<turmaModel[]>(`${this.urlbase}/${"turma"}`);
    console.log(a);
    return a;
   }


   salvarTurma(turmaModel): Observable<turmaModel>{

    var a = this.http.post<any>(`${this.urlbase}/${"turma"}`,turmaModel);
    console.log(this.headers);
   return a;
   }
   actualizarTurma(id,turmaModel): Observable<turmaModel>{

    var a = this.http.put<any>(`${this.urlbase}/${"turma"}/${id}`,turmaModel);
    console.log(this.headers);
   return a;
   }
   excluirTurma(id): Observable<turmaModel>{

    var a = this.http.delete<any>(`${this.urlbase}/${"turma"}/${id}`);
    console.log(this.headers);
   return a;
   }
   getTurma(id): Observable<turmaModel>{

    var a = this.http.get<any>(`${this.urlbase}/${"turma"}/${id}`);
   return a;
   }

}
