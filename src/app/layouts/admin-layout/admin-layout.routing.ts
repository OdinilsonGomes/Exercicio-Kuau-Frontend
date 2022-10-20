import { TransferenciaComponent } from './../../pages/transferencia/transferencia.component';
import { AlunoComponent } from './../../pages/aluno/aluno.component';
import { AutotizadoGuard } from './../../Guard/autotizado.guard';
import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { TurmaComponent } from 'src/app/pages/turma/turma.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent,canActivate: [AutotizadoGuard] },
    { path: 'turma',           component: TurmaComponent, canActivate: [AutotizadoGuard]},
    { path: 'aluno',           component: AlunoComponent, canActivate: [AutotizadoGuard]},
    { path: 'transferencia',           component: TransferenciaComponent, canActivate: [AutotizadoGuard]},
];
