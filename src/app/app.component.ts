import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Inicio', url: '/folder/Inbox', icon: 'mail' },
    { title: 'Cardapio', url: '/folder/Outbox', icon: 'fast-food' },
    { title: 'Contatos', url: '/folder/Favorites', icon: 'heart' },
    { title: 'Sobre', url: '/folder/Archived', icon: 'storefront' },

  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor() {}
}
