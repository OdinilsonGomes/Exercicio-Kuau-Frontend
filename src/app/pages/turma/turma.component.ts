import { Component, OnInit } from '@angular/core';
import { turmaModel } from 'src/app/Model/turmaModel';
import { TurmaService } from './turma.service';

@Component({
  selector: 'app-turma',
  templateUrl: './turma.component.html',
  styleUrls: ['./turma.component.scss']
})
export class TurmaComponent implements OnInit {
  public list_turma:turmaModel[];
  public turma = new turmaModel();
  public closeResult = '';
  public content_title='Lista de Tumas';
  public action_template:number=0;
  public resultado:any;
  public nome_turmaFiltro:string;
  public serie_turmaFiltro:string;
  constructor(public s_turma:TurmaService) { }

  ngOnInit(): void {
    this.getAllTurma();
    this.update_content(0);
  }
  public getAllTurma(){

    this.s_turma.getAllTurma(this.nome_turmaFiltro,this.serie_turmaFiltro).subscribe(data=>this.list_turma=data);
  }

  public update_content(action){
    this.action_template=action;
    if(this.action_template==0){
      this.resultado=null;
      this.content_title='Lista de Tumas';
    }
    if(this.action_template==1){
      this.turma=new turmaModel();
      this.content_title='Registar Turma';
    }
    if(this.action_template==2){
      this.content_title='Alterar Turma';
    }
  }
public save_turma(){
this.turma.id_utilizador=1;
if(this.action_template==1){
  this.s_turma.salvarTurma(this.turma)
  .subscribe(
    {
      next: data=>
      {
        this.resultado="Registo efectuado com sucesso";
        this.getAllTurma();
      },
      error: err=>{
        console.log(err);
        this.resultado="Erro ao Registar:"+err.error.detail;
        ;
      }

    }
  )
}else if(this.action_template==2){
  this.s_turma.actualizarTurma(this.turma.id,this.turma)
  .subscribe(
    {
      next: data=>
      {
        this.resultado="Alteração efectuada com sucesso";
        this.getAllTurma();
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

public excluir_turma(id){
  var conf=confirm("Deseja realmente Excluir esta informação");
  if(conf){
    this.s_turma.excluirTurma(id)
    .subscribe(
      {
        next: data=>
        {
          this.resultado="Alteração efectuada com sucesso";
          this.getAllTurma();
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


public showTurmaInForm(id_turma){
  this.update_content(2);
  this.s_turma.getTurma(id_turma).subscribe(
    {
      next: data=>
      {

        this.turma = data[0];
        console.log(this.turma);
      }
    });

}

}
