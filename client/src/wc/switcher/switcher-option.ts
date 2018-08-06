import { AbstractHyperElement, Define } from 'abstract-element';



@Define('insum-switcher-option')
export class InsumSwitcherOptionComponent extends AbstractHyperElement {
  public static attrNames = { value: 'data-demo' };
  public state = {
    time: new Date().toLocaleTimeString()
  };


  constructor() {
    super('', true);

    // update the time each second
    setInterval(() => {
      this.state = {
        time: new Date().toLocaleTimeString()
      };
    }, 1000);
  }


  public render() {
    return this.html`
      <div>option</div>
    `;
  }
}