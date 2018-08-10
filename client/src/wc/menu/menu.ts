

import { AbstractHyperElement, Define } from 'abstract-element';

import template from './template'


@Define('zk-menu')
export class MenuComponent extends AbstractHyperElement {
  state = {
    time: new Date().toLocaleTimeString()
  };


  constructor() {
    super('', true);
  }


  render() {
    return template(this.html, this.state);
  }
}