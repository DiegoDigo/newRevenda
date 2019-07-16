import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { take } from 'rxjs/operators';
import { MatDialog, MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-revendas',
  templateUrl: './revendas.component.html',
  styleUrls: ['./revendas.component.scss']
})
export class RevendasComponent implements OnInit {


  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['name', 'cpf', 'email', 'phone', 'create_at' , 'prospect', 'actions'];

  sort;
  @ViewChild('matsort', { read: MatSort, static: true}) set content(content: ElementRef) {
    this.sort = content;
    if (this.sort) {
      this.listData.sort = this.sort;

    }
  }

  @ViewChild('paginator', { read: MatPaginator, static: true}) paginator: MatPaginator;

  constructor(private dialog: MatDialog) { }

  ngOnInit() {}

  applyFilter(filterValue: string) {
    this.listData.filter = filterValue.trim().toLowerCase();
  }


  sendEmail = (client: any) => { }

  openDialog = (detail) => { }


}
