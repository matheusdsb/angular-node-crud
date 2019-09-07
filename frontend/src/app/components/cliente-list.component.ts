import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../services/cliente.service';
import { Observable } from 'rxjs';
import { Cliente } from '../interfaces/cliente.interface';

@Component({
  selector: 'cliente-list',
  templateUrl: './cliente-list.component.html',
})
export class ClienteListComponent implements OnInit {

  clientList: Observable<any[]> = new Observable((ob) => {
    ob.next([]);
  });

  constructor(private clienteService: ClienteService) { }

  loadList() {
    this.clienteService.getAll()
    .subscribe(data => {
      this.clientList = new Observable((ob) => {
          ob.next(data ? data : []);
        });
      },
    );
  }

  ngOnInit() {
    this.loadList();
  }

  onRemove(id){
    this.clienteService.delete(id).subscribe(
      data => {
        this.loadList();
      },
      error =>  {
        console.error(error);
      }
    );
  }
}
