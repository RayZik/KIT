import { Component } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';



/**
 * Main separator component
 */
@Component({
  selector: 'zk-separator',
  templateUrl: './separator.component.html',
  // styleUrls: ['./separator.component.css']
})
export class SeparatorComponent {
  title = 'separator';

  constructor(
    private _apollo: Apollo
  ) { }



  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit() {
    this._apollo.watchQuery({
      query: gql`
              {
                getUser(id:"1"){
                  name,
                  roles{
                    role,
                    description
                  }
                }
              }
          `
    })
      .valueChanges
      .subscribe(x => {
        console.log(x);
      });
  }
}
