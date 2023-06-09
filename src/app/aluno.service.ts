import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Alunos } from './aluno';

@Injectable({
  providedIn: 'root'
})
export class AlunoService {

  url = "http://localhost:3000/Alunos";

  constructor(private http: HttpClient) { }

  getAlunos() : Observable<Alunos[]> {
    return this.http.get<Alunos[]>(this.url);
  }

  getAluno(id: number): Observable<Alunos> {
    return this.http.get<Alunos>(`${this.url}/${id}`);
  }

  save(aluno: Alunos) : Observable<Alunos> {
    return this.http.post<Alunos>(this.url, aluno);
  }

  update(aluno: Alunos) : Observable<Alunos> {
    return this.http.put<Alunos>(`${this.url}/${aluno.id}`, aluno);
  }

  delete(aluno: Alunos) : Observable<void> {
    return this.http.delete<void>(`${this.url}/${aluno.id}`);
  }
}
