import { Component, Input } from '@angular/core';



/**
 * Main menu component
 */
@Component({
  selector: 'zk-menu',
  templateUrl: './menu.component.html',
  // styleUrls: ['./separator.component.css']
})
export class MenuComponent {
  @Input() items: any[] = [];


  constructor() { }


}
