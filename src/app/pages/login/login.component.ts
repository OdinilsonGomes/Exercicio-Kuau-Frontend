import { loginModel } from './../../Model/loginModel';
// ERROR inporting FormBuilder
import { FormGroup } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  formgroup! : FormGroup;
  public resulatdo:any;
  public usuario:string;
  public senha: string;
  constructor(private router: Router, public loginService: LoginService) {}

  ngOnInit() {

  }

  ngOnDestroy() {
  }
  SubmitForm(){
   // var dadoslogin=this.formgroup.getRawValue() as loginModel;
    var dadoslogin={"usuario":this.usuario,"senha":this.senha};

    this.loginService.Logar(dadoslogin)
    .subscribe(
      {
        next: data=>
        {
          this.resulatdo="Login efectuado com sucesso";
          this.loginService.setToken(data);
          this.router.navigate(['/dashboard']);
        },
        error: err=>{
          this.resulatdo="Nome do usuario ou senha Incoreto";
        }

      }
    )
  }
}
