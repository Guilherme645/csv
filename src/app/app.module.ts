import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { UploadComponent } from './components/upload/upload.component';

// PrimeNG Modules
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { ProgressBarModule } from 'primeng/progressbar';
import { BadgeModule } from 'primeng/badge';
import { MessageService } from 'primeng/api';
import { CarregarArquivoComponent } from './pages/CarregarArquivo/CarregarArquivo.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { PageLoginComponent } from './pages/pageLogin/pageLogin.component';

@NgModule({
  declarations: [
    AppComponent,
    UploadComponent,
    LoginComponent,
    PageLoginComponent,
CarregarArquivoComponent  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    FileUploadModule,
    ToastModule,
    ButtonModule,
    ProgressBarModule,
    BadgeModule,
    RouterModule,
    AppRoutingModule,
    
  ],
  providers: [MessageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
