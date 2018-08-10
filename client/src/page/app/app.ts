

import { AbstractHyperElement, Define } from 'abstract-element';

import template from './template'

@Define('zk-app')
export class AppComponent extends AbstractHyperElement {

  state = {
    menu: []
  };


  constructor() {
    super('', true);

    this.state.menu = Array.from({ length: 5 }, (_, i) => {
      return `<zk-menu-item data-value="${i}"></zk-menu-item>`
    });
  }


  render() {
    return template(this.html, this.state);
  }
}