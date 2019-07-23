import { RevendaComponent } from './../../shared/modal/revenda/revenda.component';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { RevendaService } from './revenda.service';
import * as fileSaver from 'file-saver';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-revendas',
  templateUrl: './revendas.component.html',
  styleUrls: ['./revendas.component.scss']
})
export class RevendasComponent implements OnInit {

  private readonly FILENAME = 'docker-compose.yml';

  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['license', 'name', 'actions'];

  sort;
  @ViewChild(MatSort, { static: true }) set content(content: ElementRef) {
    this.sort = content;
    if (this.sort) {
      this.listData.sort = this.sort;
    }
  }


  @ViewChild('paginator', { read: MatPaginator, static: true }) paginator: MatPaginator;

  constructor(private revendaService: RevendaService,
              private dialog: MatDialog) { }

  ngOnInit() {

    this.revendaService.getAllRevendas().subscribe((array: any[]) => {
      setTimeout(() => this.listData.paginator = this.paginator);
      this.listData = new MatTableDataSource(array);
    });
  }

  applyFilter(filterValue: string) {
    this.listData.filter = filterValue.trim().toLowerCase();
  }


  fazerDownload = (revenda: any) => {
    this.revendaService.download(revenda.id)
      .subscribe(
        data => this.downloadFile(data),
        () => console.log('Error downloading the file.'),
        () => console.log('OK'));
  }

  openDialog = () => {
    const dialogRef = this.dialog.open(RevendaComponent, {
      height: '305px',
      width: '600px',
    });

    dialogRef.afterClosed().pipe(take(1)).subscribe();
  }

  downloadFile = (data: any, filename?: string) => {
    const blob = new Blob([data], { type: 'text/csv; charset=utf-8' });
    fileSaver.saveAs(blob, this.FILENAME);
  }

}
