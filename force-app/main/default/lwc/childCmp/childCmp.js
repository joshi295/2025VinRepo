import { LightningElement ,api} from 'lwc';

export default class ChildCmp extends LightningElement {

  @api itemName ='Vinay Joshi';

  @api handleChangeValue(){
    this.itemName = 'Button is Working';
  }
}