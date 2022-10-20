import { AlunoService } from './../aluno/aluno.service';
import { TurmaService } from './../turma/turma.service';
import { alunoModel } from './../../Model/alunoModel';
import { turmaModel } from 'src/app/Model/turmaModel';
import { TransferenciaService } from './transferencia.service';
import { transferenciaModel } from './../../Model/transferenciaModel';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transferencia',
  templateUrl: './transferencia.component.html',
  styleUrls: ['./transferencia.component.scss']
})
export class TransferenciaComponent implements OnInit {
  public list_tranferencia :transferenciaModel[];
  public list_turma :turmaModel[];
  public list_aluno :alunoModel[];
  public tranferencia = new transferenciaModel();
  public id_turmaFiltro :  number;
  public nome_alunoFiltro: string;
  public closeResult = '';
  public content_title='Lista de Transferencia';
  public action_template:number=0;
  public resultado:any;
  constructor(public s_transferencia:TransferenciaService, public s_turma:TurmaService, public s_aluno:AlunoService) { }

  ngOnInit(): void {
    this.getAllTransferencia();
    this.update_content(0);
  }

  public save_transferencia(){
    this.tranferencia.id_utilizador=1;

      this.s_transferencia.salvarTransferencia(this.tranferencia)
      .subscribe(
        {
          next: data=>
          {
            this.resultado="Registo efectuado com sucesso";
            this.getAllTransferencia();
          },
          error: err=>{
            console.log(err);
            this.resultado="Erro ao Registar:"+err.error.detail;
          }

        }
      )


    }

  public update_content(action){
    this.action_template=action;
    this.getAllTurma();
    this.getAllAluno();
    if(this.action_template==0){
      this.resultado=null;
      this.content_title='Lista de Transferencias';
    }
    if(this.action_template==1){
      this.tranferencia=new transferenciaModel();
      this.content_title='Registar Transferencia';
    }
  }
  public getAllTransferencia(){

    this.s_transferencia.getAllTransferencia().subscribe(data=>this.list_tranferencia=data);
  }
  public getAllTurma(){
    this.s_turma.getAllTurma(null,null).subscribe(data=>this.list_turma=data);
  }

  public getAllAluno(){
    this.s_aluno.getAllAluno().subscribe(data=>this.list_aluno=data);
  }
  public excluir_transferencia(id){
    var conf=confirm("Deseja realmente Excluir esta informação");
  if(conf){
    this.s_transferencia.excluirTransferencia(id)
    .subscribe(
      {
        next: data=>
        {
          this.resultado="Exclusão efectuada com sucesso";
          this.getAllTransferencia();
        },
        error: err=>{
          console.log(err);
          this.resultado="Erro ao Registar:"+err.error.detail;
          ;
        }

      }
    )
  }
  }
}
