import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { take } from 'rxjs/operators';

@Injectable()
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  private readonly url = environment.BASE_URL;

  login = (login: any) => {
    return this.http.post(`${this.url}/login`, login).pipe(take(1));
  }
}
