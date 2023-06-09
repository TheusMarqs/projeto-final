import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlunoService } from '../aluno.service';

@Component({
  selector: 'app-alunos-form',
  templateUrl: './alunos-form.component.html',
  styleUrls: ['./alunos-form.component.css']
})
export class AlunosFormComponent implements OnInit {
  formGroupAluno: FormGroup;
  submitted: boolean = false;
  isEditing: boolean = false;

  constructor(private formBuilder: FormBuilder, private alunoService: AlunoService,
    private route: ActivatedRoute,
    private router: Router) {

    this.formGroupAluno = formBuilder.group({
      id: [''],
      age: ['', [Validators.required]],
      name: ['', [Validators.required]],
      phone: ['', [Validators.required]]
    });
  }
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get("id"));
    this.getAlunoById(id);
  }

  getAlunoById(id: number) {
    this.alunoService.getAluno(id).subscribe({
      next: data => {
        this.formGroupAluno.setValue(data);
        this.isEditing = true;
      }
    })
  }


  save() {
    this.submitted = true;
    if (this.isEditing) {
      if (this.formGroupAluno.valid) {
        this.alunoService.update(this.formGroupAluno.value).subscribe({
          next: () => {
            this.router.navigate(['aluno']);
          }
        })
      }

    }

    else {
      if (this.formGroupAluno.valid) {
        this.alunoService.save(this.formGroupAluno.value).subscribe({
          next: () => {
            this.router.navigate(['aluno']);
          }
        })
      }
    }
  }

  cancel() {
    this.router.navigate(['aluno']);
  }

  get name(): any {
    return this.formGroupAluno.get("name");
  }
  get age(): any {
    return this.formGroupAluno.get("age");
  }
  get phone(): any {
    return this.formGroupAluno.get("phone");
  }
}
