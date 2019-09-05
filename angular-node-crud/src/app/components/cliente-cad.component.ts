import { Component, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'cliente-cad',
  templateUrl: './cliente-cad.component.html',
})
export class ClienteCadComponent {

  submited = false;
  message = null;
  
  form = this.fb.group({
    nome: ['', [Validators.required]],
    codigo:  ['', [Validators.required]],
    endereco:  ['', [Validators.required]],
    telefone:  ['', [Validators.required]],
    status:  ['', [Validators.required]],
    dataNascimento:  ['', [Validators.required]],
  });

  constructor(private fb: FormBuilder) { }

  onSubmit() {
    this.submited = true;
    
    if(this.form.valid) {      
      this.form.reset();
      this.submited = false;
      this.message = "Cliente salvo com sucesso.";
    }
    
  }
}