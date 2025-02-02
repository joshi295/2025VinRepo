import { LightningElement } from 'lwc';

export default class AddMultipleContacts extends LightningElement {

  genders=[
    {label : 'Male', value:'male'},
    {label : 'Female',value:'female'},
    {label : 'Others',value:'other'}
  ]
}