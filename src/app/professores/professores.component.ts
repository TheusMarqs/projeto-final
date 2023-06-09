import { Component } from '@angular/core';
import { Professores } from '../professor';
import { ProfessorService } from '../professor.service';

@Component({
  selector: 'app-professores',
  templateUrl: './professores.component.html',
  styleUrls: ['./professores.component.css']
})
export class ProfessoresComponent {

  professores: Professores[] = [];
  professor: Professores = {} as Professores;
  isEditing: boolean = false;

  constructor(private professorService: ProfessorService) {
    
  }

  onSaveEvent(professor: Professores) {
    if (this.isEditing) {
      this.professorService.update(professor).subscribe({
        next: () => {
          this.loadProfessores();
          this.isEditing = false;
        }
      })
    }

    else {
      this.professorService.save(professor).subscribe({
        next: data => {
          this.professores.push(data);
        }
      })
    }
  }

  ngOnInit() : void {
    this.loadProfessores();
  }

  loadProfessores() {
    this.professorService.getProfessor().subscribe({
      next: data => this.professores = data
    });
  }
    
  edit(professor: Professores) {
    this.professor = professor;
    this.isEditing = true;
  }

  delete(professor: Professores) {
    this.professorService.delete(professor).subscribe({
      next: () => this.loadProfessores()
    });
  }

  exibirBtn: boolean = false;

  onExibirEvent(exibindo: boolean) {
    this.exibirBtn = exibindo;
  }

  onCleanEvent(editando: boolean) {
    this.isEditing = editando;
  }
}
