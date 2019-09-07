import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../services/cliente.service';
import { Observable } from 'rxjs';
import { Cliente } from '../interfaces/cliente.interface';

@Component({
  selector: 'cliente-list',
  templateUrl: './cliente-list.component.html',
})
export class ClienteListComponent implements OnInit {

  clientList: any = new Observable();

  constructor(private clienteService: ClienteService) { }

  ngOnInit() {
    this.clienteService.getAll()
    .subscribe(
      data => {
        this.clientList = data.docs;
      },
    );
  }
  
}