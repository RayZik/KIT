

import { AbstractHyperElement, Define } from 'abstract-element';

import template from './template';

import style from './style';


@Define('zk-main-menu')
export class MainMenuComponent extends AbstractHyperElement {
  state = {
    time: new Date().toLocaleTimeString()
  };


  constructor() {
    super(style, true);
  }


  render() {
    console.log(document.head);

    return template(this.html, this.state);
  }
}