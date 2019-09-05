import { Component, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { ClienteService } from '../services/cliente.service';
import { Cliente } from '../interfaces/cliente.interface';

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

  constructor(private fb: FormBuilder, private clienteService: ClienteService) { }

  onSubmit() {
    this.submited = true;

    if (this.form.valid) {
      const cliente: Cliente = this.form.value;
      this.save(cliente);
    }

  }

  save(cliente: Cliente) {
      this.clienteService.save(cliente)
      .subscribe(
        data => {
          console.log(data);
          this.form.reset();
          this.submited = false;
          this.message = 'Cliente salvo com sucesso.';
        },
        error => console.log('error', error)
      );
  }
}