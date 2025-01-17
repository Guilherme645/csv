import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { uploadService } from 'src/app/service/upload.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
})
export class UploadComponent {
  responseMessage: string = ''; 
  csvUrl: string = ''; 
  fileContent: string = ''; 
  isUploading: boolean = false; 

  constructor(
    private uploadService: uploadService,
    private messageService: MessageService
  ) {}

  onFileSelect(event: any): void {
    const file: File = event.files[0];

    if (!file) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Nenhum arquivo selecionado.',
      });
      return;
    }

    if (file.type !== 'text/plain') {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Apenas arquivos .txt são permitidos.',
      });
      return;
    }
    this.uploadFile(file);
  }

  private uploadFile(file: File): void {
    this.isUploading = true;
    this.uploadService.uploadFile(file).subscribe(
      (response) => {
        this.csvUrl = response.csv_url; 
        this.isUploading = false; 
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Arquivo enviado e processado com sucesso.',
        });
      },
      (error) => {
        this.isUploading = false; 
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao enviar o arquivo.',
        });
        console.error(error);
      }
    );
  }

  onDownloadContent(): void {
    if (!this.csvUrl) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Nenhum arquivo disponível para visualizar.',
      });
      return;
    }

    const fileName = this.csvUrl.split('/').pop() || '';
    this.uploadService.getFileContent(fileName).subscribe(
      (response) => {
        this.fileContent = response.conteudo_arquivo; 
        this.downloadFile(this.fileContent, 'saida.csv');
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao obter o conteúdo do arquivo.',
        });
        console.error(error);
      }
    );
  }

  private downloadFile(content: string, fileName: string): void {
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
    window.URL.revokeObjectURL(link.href); 
  }
}
