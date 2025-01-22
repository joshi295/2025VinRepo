import { LightningElement } from 'lwc';
import getContacts from '@salesforce/apex/ImperativeDemoClass.getContacts';

const columns = [
           { label: 'Name', fieldName : 'LastName'},
           //{label : 'Phone', fieldName : 'Phone'},
           {label :'Account Name', fieldName: 'AccountName'}

];
export default class DisplayContacts extends LightningElement {

  data = [];
  error;
  columns = columns;

  handleClick(){

    getContacts()
    .then(result =>{
      this.data = JSON.parse(JSON.stringify(result));
      console.log('JSON.parse(JSON.stringify(result))',JSON.parse(JSON.stringify(result)));

      this.data.forEach(record => {
        if(record.AccountId){
          record.AccountName = record.Account.Name;
        }
      });

      console.log('result is',result);
    })
    .catch(error =>{
      console.log('error',error);
    })
  }
}