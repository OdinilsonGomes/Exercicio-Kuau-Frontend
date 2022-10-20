import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { turmaModel } from 'src/app/Model/turmaModel';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }
  private readonly urlbase= environment['endPoint'];

  getAllTurma(): Observable<turmaModel[]>{

    var a = this.http.get<turmaModel[]>(`${this.urlbase}/${"turma"}`);
    console.log(a);
   return a;
   }
}
