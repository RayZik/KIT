

import { AbstractHyperElement, Define } from 'abstract-element';

import template from './template';



@Define('zk-main-menu')
export class MainMenuComponent extends AbstractHyperElement {
  state = {
    time: new Date().toLocaleTimeString()
  };


  constructor() {
    super(require('./style.css'), true);
  }


  render() {
    return template(this.html, this.state);
  }
}