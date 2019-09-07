import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClienteCadComponent } from './components/cliente-cad.component';
import { ClienteListComponent } from './components/cliente-list.component';

const routes: Routes = [
  { path: 'cliente/cad', component: ClienteCadComponent },
  { path: 'cliente/cad/:id', component: ClienteCadComponent },
  { path: 'cliente/list', component: ClienteListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
