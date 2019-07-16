import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: 'dashboard', title: 'Dashboard', icon: 'dashboard', class: '' },
    { path: 'perfil', title: 'Perfil', icon: 'face', class: '' },
    { path: 'novas', title: 'Novas Empresas', icon: 'person_add', class: '' },
    { path: 'migradas', title: 'Empresas Migrada', icon: 'call_missed_outgoing', class: '' },

];


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {

  menuItems: any[];

  constructor(private route: Router) { }

  ngOnInit() {
      this.menuItems = ROUTES.filter(menuItem => menuItem);
  }

  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  }

  logout = () => {
      console.log('teste');
  }


}
