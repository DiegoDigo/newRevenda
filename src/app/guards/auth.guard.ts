import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable()
export class AuthGuard implements CanLoad {


  constructor(private router: Router) { }

  canLoad(route: Route, segments: UrlSegment[]): boolean | Observable<boolean> | Promise<boolean> {
    if (localStorage.getItem('token')) {
      return true;
    } else {
      this.router.navigate(['']);
      return false;
    }
  }



}
