import { AbstractHyperElement, Define } from 'abstract-element';



@Define('insum-switcher')
export class InsumSwitcherComponent extends AbstractHyperElement {
  public static attrNames = { dataModel: 'data-model' };
  public state = {
    time: new Date().toLocaleTimeString()
  };


  constructor() {
    super('', true);
    setTimeout(() => {
      // tslint:disable-next-line:no-console
      console.log(111);

      this.state = {
        time: new Date().toLocaleTimeString()
      };
    }, 1000)
  }

  public render() {
    return this.html`
    <section>
      <p>${this.attr[InsumSwitcherComponent.attrNames.dataModel]}</p>
      <div>${this.state.time}</div>
      <slot></slot>
    </section>`;
  }
}