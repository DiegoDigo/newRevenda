import { RevendaComponent } from './../../shared/modal/revenda/revenda.component';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { RevendaService } from './revenda.service';
import * as fileSaver from 'file-saver';
import { take } from 'rxjs/operators';
import { ConfigurationComponent } from 'src/app/shared/modal/configuration/configuration.component';
import { DetailComponent } from 'src/app/shared/modal/detail/detail.component';

@Component({
  selector: 'app-revendas',
  templateUrl: './revendas.component.html',
  styleUrls: ['./revendas.component.scss']
})
export class RevendasComponent implements OnInit {

  private readonly FILENAME = 'docker-compose.yml';
  public disabled = false;

  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['license', 'name', 'cnpj', 'ambiente', 'actions'];


  private environments: any[] = [
    { value: 'DEVELOP', viewValue: 'Desenvolvimento' },
    { value: 'PRODUCTION', viewValue: 'Produção' },
    { value: 'QA', viewValue: 'Qualidade (QA)' }
  ];

  @ViewChild(MatSort, { static: false }) sort: MatSort;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(private revendaService: RevendaService,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.loadRevendas();
    this.getEnvironment("DEVELOP");

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
      height: '426px',
      width: '600px',
    });

    dialogRef.afterClosed().pipe(take(1)).subscribe(() => this.loadRevendas());
  }

  openDialogConfig = (detail) => {
    const dialogRef = this.dialog.open(ConfigurationComponent, {
      height: '650px',
      width: '1000px',
      data: { revenda: detail }
    });

    dialogRef.afterClosed().pipe(take(1)).subscribe(() => this.loadRevendas());
  }

  openDialogDetails = (detail) => {
    const dialogRef = this.dialog.open(DetailComponent, {
      height: '650px',
      width: '1000px',
      data: { revenda: detail }
    });

    dialogRef.afterClosed().pipe(take(1)).subscribe();
  }

  downloadFile = (data: any) => {
    const blob = new Blob([data], { type: 'text/csv; charset=utf-8' });
    fileSaver.saveAs(blob, this.FILENAME);
  }

  loadRevendas = () => {
    this.revendaService.getAllRevendas().subscribe((array: any[]) => {
      setTimeout(() => {
        this.listData.paginator = this.paginator;
        this.listData.sort = this.sort;
      });
      console.log(array);
      this.listData = new MatTableDataSource(array);
    });
  }


  getEnvironment = (environment: string) => {
    return this.environments.filter(el => el.value === environment)[0].viewValue;
  }

}
