import { Component, OnInit } from '@angular/core';
import { Alunos } from '../aluno';
import { AlunoService } from '../aluno.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alunos',
  templateUrl: './alunos.component.html',
  styleUrls: ['./alunos.component.css']
})
export class AlunosComponent implements OnInit{
  alunos: Alunos[] = [];

  constructor(private alunosService: AlunoService, private router: Router) {
  }


  ngOnInit(): void {
    this.loadAlunos();
  }

  loadAlunos() {
    this.alunosService.getAlunos().subscribe({
      next: data => this.alunos = data
    });
  }


  create(){
    this.router.navigate(['alunoCreate']);
  }

  edit(aluno: Alunos) {
    this.router.navigate(['alunoEdit', aluno.id]);
  }

  delete(aluno: Alunos) {
    this.alunosService.delete(aluno).subscribe({
      next: () => this.loadAlunos()
    });
  }
}
