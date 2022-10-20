import { Observable } from 'rxjs';
import { alunoModel } from './../../Model/alunoModel';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AlunoService {

  constructor(private http: HttpClient) { }

  private readonly urlbase= environment['endPoint'];

  getAllAluno(): Observable<alunoModel[]>{
    var a = this.http.get<alunoModel[]>(`${this.urlbase}/${"aluno"}`);
    return a;
   }

  getAlunoTurma(nome_aluno,id_turma): Observable<alunoModel[]>{
    let params = new HttpParams();
    params=params.append("nome_aluno",nome_aluno);
    var a=null;
    if(nome_aluno)
       a = this.http.get<alunoModel[]>(`${this.urlbase}/${"alunov2"}/${"turma"}/${id_turma}`,{params});
    else
       a = this.http.get<alunoModel[]>(`${this.urlbase}/${"alunov2"}/${"turma"}/${id_turma}`);
    return a;
   }

   salvarAluno(turmaModel): Observable<alunoModel>{

    var a = this.http.post<any>(`${this.urlbase}/${"aluno"}`,turmaModel);
    console.log(a);
   return a;
   }
   actualizarAluno(id,turmaModel): Observable<alunoModel>{

    var a = this.http.put<any>(`${this.urlbase}/${"aluno"}/${id}`,turmaModel);
   return a;
   }
   excluirAluno(id): Observable<alunoModel>{

    var a = this.http.delete<any>(`${this.urlbase}/${"aluno"}/${id}`);
   return a;
   }
   getAluno(id): Observable<alunoModel>{

    var a = this.http.get<any>(`${this.urlbase}/${"aluno"}/${id}`);
   return a;
   }

}
