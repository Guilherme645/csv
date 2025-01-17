import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { uploadService } from 'src/app/service/upload.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
})
export class UploadComponent {
  responseMessage: string = ''; // Mensagem de feedback
  csvUrl: string = ''; // URL do arquivo gerado após o upload
  fileContent: string = ''; // Conteúdo do arquivo gerado
  isUploading: boolean = false; // Controle do estado do Progress Bar

  constructor(
    private uploadService: uploadService,
    private messageService: MessageService
  ) {}

  // Método chamado automaticamente ao selecionar o arquivo
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

    // Inicia o upload automaticamente
    this.uploadFile(file);
  }

  // Método para upload do arquivo
  private uploadFile(file: File): void {
    // Ativa o Progress Bar
    this.isUploading = true;

    this.uploadService.uploadFile(file).subscribe(
      (response) => {
        this.csvUrl = response.csv_url; // Captura a URL do CSV gerado
        this.isUploading = false; // Finaliza o Progress Bar
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Arquivo enviado e processado com sucesso.',
        });
      },
      (error) => {
        this.isUploading = false; // Finaliza o Progress Bar em caso de erro
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao enviar o arquivo.',
        });
        console.error(error);
      }
    );
  }

  // Método para visualizar e armazenar o conteúdo
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
        this.fileContent = response.conteudo_arquivo; // Armazena o conteúdo do arquivo

        // Gera o download do conteúdo como arquivo local
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

  // Método para criar e fazer o download do arquivo no cliente
  private downloadFile(content: string, fileName: string): void {
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
    window.URL.revokeObjectURL(link.href); // Libera a memória após o download
  }
}
