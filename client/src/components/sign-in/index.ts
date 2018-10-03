

import { AbstractHyperElement, Define } from 'abstract-element';

import template from './template';



@Define('zk-sign-in')
export class SignInComponent extends AbstractHyperElement {
  state = {
    login: '123',
    password: '321'
  };


  constructor() {
    super(require('./style.css'), true);
  }


  render() {
    return template(this.html, this.state);
  }
}