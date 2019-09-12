import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../services/cliente.service';
import { Observable } from 'rxjs';
import { Cliente } from '../interfaces/cliente.interface';
import { ExportService } from '../services/export.service';

@Component({
  selector: 'cliente-list',
  templateUrl: './cliente-list.component.html',
})
export class ClienteListComponent implements OnInit {

  fieldOrderBy: keyof Cliente = 'code';
  multiplierOrderBy: 1 | -1 = 1;

  clientList: Observable<Cliente[]> = new Observable((ob) => {
    ob.next([]);
  });

  constructor(private clienteService: ClienteService, private exportService: ExportService) { }

  loadList() {
    this.clienteService.getAll()
    .subscribe(data => {
      this.clientList = new Observable((ob) => {
          ob.next(data ? data.sort((a, b) => 
            a[this.fieldOrderBy] > b[this.fieldOrderBy] ? 1 * this.multiplierOrderBy : -1 * this.multiplierOrderBy)
            : []
          );
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

  export() {

    const jsonArray: Cliente[] = [];

    this.clientList.forEach(element => {
      element.forEach(c => jsonArray.push(c));
    });

    this.exportService.exportExcel(jsonArray, 'clients');
  }

  orderBy(field: keyof Cliente) {

    if(field !== this.fieldOrderBy) {
      this.fieldOrderBy = field;
      this.multiplierOrderBy = 1;
    } else {
      this.multiplierOrderBy *= -1;
    }

    this.fieldOrderBy = field;
    this.loadList();
  }
}
