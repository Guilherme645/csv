import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadComponent } from './components/upload/upload.component';
import { CarregarArquivoComponent } from './pages/CarregarArquivo/CarregarArquivo.component';

const routes: Routes = [
  { path: 'inicio', redirectTo: 'home', pathMatch: 'full' }, 
  { path: 'home', component: CarregarArquivoComponent },
  { path: 'upload', component: UploadComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
