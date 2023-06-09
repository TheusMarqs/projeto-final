import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Professores } from './professor';

@Injectable({
  providedIn: 'root'
})
export class ProfessorService {

  url = "http://localhost:3000/Professores";

  constructor(private http: HttpClient) { }

  getProfessor() : Observable<Professores[]> {
    return this.http.get<Professores[]>(this.url);
  }

  save(professor: Professores) : Observable<Professores> {
    return this.http.post<Professores>(this.url, professor);
  } 

  update(professor: Professores) : Observable<Professores> {
    return this.http.put<Professores>(`${this.url}/${professor.id}`, professor);
  }

  delete(professor: Professores) : Observable<void> {
    return this.http.delete<void>(`${this.url}/${professor.id}`);
  }
}
