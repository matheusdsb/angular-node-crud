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
  error = false;
  
  form = this.fb.group({
    name: ['', [Validators.required]],
    code:  ['', [Validators.required]],
    address:  ['', [Validators.required]],
    telephone:  ['', [Validators.required]],
    status:  ['', [Validators.required]],
    birthDate:  ['', [Validators.required]],
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
          //this.error = false;
          this.message = 'Client successfully saved.';
        },
        error =>  {
          //this.error = true;
          this.message = error;
        }
      );
  }
}