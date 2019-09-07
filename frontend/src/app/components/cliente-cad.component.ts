import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { ClienteService } from '../services/cliente.service';
import { Cliente } from '../interfaces/cliente.interface';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'cliente-cad',
  templateUrl: './cliente-cad.component.html',
})
export class ClienteCadComponent implements OnInit, AfterViewInit {

  id: string = null;
  routerSub: any;

  submited = false;
  message = null;
  error = false;
  
  form = this.initForm();

  constructor(private fb: FormBuilder, private clienteService: ClienteService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.routerSub = this.route.params.subscribe((params) => {
			this.id = params['id'];
		});
  }

  initForm(client?) {
    return this.fb.group({      
      code:  [client && client.code ? client.code : '', [Validators.required]],
      name: [client && client.name ? client.name : '', [Validators.required]],
      address:  [client && client.address ? client.address : '', [Validators.required]],
      telephone:  [client && client.telephone ? client.telephone : '', [Validators.required]],
      status:  [client && client.status ? client.status : '', [Validators.required]],
      birthDate:  [client && client.birthDate ? moment(client.birthDate).format('MM/DD/YYYY') : '', [Validators.required]],
    });
  }

	ngAfterViewInit() {

    if(this.id) {
      this.clienteService.getById(this.id)
      .subscribe(
        data => {
          this.form = this.initForm(data);
        },
        error =>  {
          this.message = error;
        }
      );
    }
  }

  onSubmit() {
    this.submited = true;

    if (this.form.valid) {
      const cliente: Cliente = this.form.value;

      if (this.id) {
        this.update(cliente);
      } else {
        this.create(cliente);
      }
    }
  }

  update(cliente: Cliente) {
    this.clienteService.update(this.id, cliente)
    .subscribe(
      data => {
        this.submited = false;
        this.message = 'Client successfully updated.';
      },
      error =>  {
        this.message = error;
      }
    );
  }

  create(cliente: Cliente) {
      this.clienteService.save(cliente)
      .subscribe(
        data => {
          this.form.reset();
          this.submited = false;
          this.message = 'Client successfully created.';
        },
        error =>  {
          this.message = error;
        }
      );
  }
}