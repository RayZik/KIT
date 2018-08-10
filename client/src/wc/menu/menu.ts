

import { AbstractHyperElement, Define } from 'abstract-element';

import template from './template'

import * as style from './style'


@Define('zk-menu')
export class MenuComponent extends AbstractHyperElement {
  state = {
    time: new Date().toLocaleTimeString()
  };


  constructor() {
    super(style.default, true);

    console.log(style);

  }


  render() {
    return template(this.html, this.state);
  }
}