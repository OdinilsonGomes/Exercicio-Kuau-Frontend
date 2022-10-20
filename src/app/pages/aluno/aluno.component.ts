import { TurmaService } from './../turma/turma.service';
import { turmaModel } from 'src/app/Model/turmaModel';
import { AlunoService } from './aluno.service';
import { alunoModel } from './../../Model/alunoModel';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-aluno',
  templateUrl: './aluno.component.html',
  styleUrls: ['./aluno.component.scss']
})
export class AlunoComponent implements OnInit {
  public list_turma:turmaModel[];
  public list_aluno:alunoModel[];
  public aluno = new alunoModel();
  public id_turmaFiltro :  number;
  public nome_alunoFiltro: string;
  public closeResult = '';
  public content_title='Lista de Tumas';
  public action_template:number=0;
  public resultado:any;

  constructor( public s_aluno:AlunoService,public s_turma:TurmaService) { }

  ngOnInit(): void {
    this.getAllAluno();
    this.update_content(0);
  }
  public getAllAluno(){

    this.s_aluno.getAllAluno().subscribe(data=>this.list_aluno=data);
    console.log(this.list_aluno);
  }
  public getAlunoTurma(){

    if(this.id_turmaFiltro>0){
      this.s_aluno.getAlunoTurma(this.nome_alunoFiltro,this.id_turmaFiltro).subscribe({
        next:data=>{this.list_aluno=data},
        error: err=>{this.list_aluno=null}
      });
    }else{
      this.getAllAluno();
    }

  }
  public getAllTurma(){

    this.s_turma.getAllTurma(null,null).subscribe(data=>this.list_turma=data);
  }

  public update_content(action){
    this.action_template=action;
    this.getAllTurma();
    if(this.action_template==0){
      this.resultado=null;
      this.content_title='Lista de Alunos';
    }
    if(this.action_template==1){
      this.aluno=new alunoModel();
      this.content_title='Registar Aluno';

    }
    if(this.action_template==2){
      this.content_title='Alterar Aluno';
    }
  }
public save_aluno(){
this.aluno.id_utilizador=1;
if(this.action_template==1){
  this.s_aluno.salvarAluno(this.aluno)
  .subscribe(
    {
      next: data=>
      {
        this.resultado="Registo efectuado com sucesso";
        this.getAllAluno();
      },
      error: err=>{
        console.log(err);
        this.resultado="Erro ao Registar:"+err.error.detail;
      }

    }
  )
}else if(this.action_template==2){
  this.s_aluno.actualizarAluno(this.aluno.id,this.aluno)
  .subscribe(
    {
      next: data=>
      {
        this.resultado="Alteração efectuada com sucesso";
        this.getAllAluno();
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

public excluir_aluno(id){
  var conf=confirm("Deseja realmente Excluir esta informação");
  if(conf){
    this.s_aluno.excluirAluno(id)
    .subscribe(
      {
        next: data=>
        {
          this.resultado="Exclusão efectuada com sucesso";
          this.getAllAluno();
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


public showAlunoInForm(id_aluno){
  this.update_content(2);

  this.s_aluno.getAluno(id_aluno).subscribe(
    {
      next: data=>
      {
        this.aluno = data[0];
        console.log(this.aluno);
      }
    });

}

}
