import { LightningElement,api } from 'lwc';

export default class ClockDropdown extends LightningElement {
 @api label = '';
 @api option =[];
 @api uniqueId ='';

 ChangeHandler(event){
  console.log(this.label);
  console.log(event.target.value);
  this.callParent(event.target.value);
 }

 callParent(value){
  this.dispatchEvent(new CustomEvent('optionhandler',{
      detail : {
        label : this.label,
        value : value
      }
  }))
}

@api reset(value){
  // here we will take the reference of select, which is in html component
  this.template.querySelector('select').value = value;
  this.callParent(value);
}
}