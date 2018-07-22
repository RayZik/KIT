import { Component } from '@angular/core';


/**
 * Main client component
 */
@Component({
  selector: 'zk-client',
  templateUrl: './client.component.html',
  // styleUrls: ['./client.component.css']
})
export class ClientComponent {
  title = 'client';
  menuItems = [
    {
      name: 'Главная',
      link: '/main'
    },
    {
      name: 'Главная2',
      link: '/main2'
    },
    {
      name: 'Главная3',
      link: '/main3'
    },
  ];
}
