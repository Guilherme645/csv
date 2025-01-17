import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarregarArquivoComponent } from './pages/CarregarArquivo/CarregarArquivo.component';
import { AuthGuard } from './auth.guard';
import { PageLoginComponent } from './pages/pageLogin/pageLogin.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: PageLoginComponent },
  { path: 'home', component: CarregarArquivoComponent, canActivate: [AuthGuard] }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
