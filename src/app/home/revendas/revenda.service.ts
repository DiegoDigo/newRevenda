import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()
export class RevendaService {

  private readonly url = environment.BASE_URL;

  constructor(private http: HttpClient) { }

  getAllRevendas = () => {
    return this.http.get(`${this.url}/revenda/all`).pipe(take(1));
  }

  download = (id: string) => {
    return this.http.get(`${this.url}/config/${id}`, {responseType: 'text'}).pipe(take(1));
  }

  create = (revenda: any) => {
    return this.http.post(`${this.url}/revenda/register`, revenda.value).pipe(take(1));
  }

  licenseExist = (license: string) => {
    return this.http.get(`${this.url}/revenda/license/${Number(license)}`);
  }
}
