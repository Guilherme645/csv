import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class uploadService {
  private apiUrl = 'http://10.1.1.16:8000/process_file';

  constructor(private http: HttpClient) {}

  // Método para upload do arquivo
  uploadFile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(this.apiUrl, formData, {
      headers: {
        Accept: 'application/json',
      },
    });
  }

  // Método para obter o conteúdo do arquivo gerado
  getFileContent(fileName: string): Observable<any> {
    const url = `http://10.1.1.16:8000/downloads/${fileName}`;
    return this.http.get(url, { responseType: 'json' });
  }
}
