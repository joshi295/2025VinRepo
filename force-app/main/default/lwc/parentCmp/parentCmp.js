import { LightningElement } from 'lwc';

export default class ParentCmp extends LightningElement {

  handleClick(){
    this.template.querySelector("c-child-cmp").handleChangeValue();
  }
}