import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Professores } from '../professor';

@Component({
  selector: 'app-professores-form',
  templateUrl: './professores-form.component.html',
  styleUrls: ['./professores-form.component.css']
})
export class ProfessoresFormComponent implements OnChanges {
  submitted: boolean = false;

  @Input()
  professor: Professores = {} as Professores;

  @Output()
  saveEvent = new EventEmitter<Professores>();

  @Output()
  exibirEvent = new EventEmitter<boolean>();

  @Output()
  cleanEvent = new EventEmitter<boolean>();


  formGroupProfessor: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.formGroupProfessor = this.formBuilder.group({
      id: [''],
      name: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      subject: ['', [Validators.required]]
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.formGroupProfessor.setValue(this.professor);
  }

  save() {
    this.submitted = true;
    if (this.formGroupProfessor.valid) {
      this.saveEvent.emit(this.formGroupProfessor.value);
      this.formGroupProfessor.reset();
      this.submitted = false;
    }
  }

  txtBtn: string = 'Exibir';
  verificarBtn: boolean = false;

  exibir() {
    if (this.verificarBtn == false) {
      this.verificarBtn = true;
      this.txtBtn = 'Ocultar';
    }
    else {
      this.verificarBtn = false;
      this.txtBtn = 'Exibir';
    }

    this.exibirEvent.emit(this.verificarBtn);
  }

  clean() {
    this.formGroupProfessor.reset();
    this.cleanEvent.emit(false);
  }

  get name(): any {
    return this.formGroupProfessor.get('name');
  }

  get phone(): any {
    return this.formGroupProfessor.get('phone');
  }

  get subject(): any {
    return this.formGroupProfessor.get('subject');
  }
}
