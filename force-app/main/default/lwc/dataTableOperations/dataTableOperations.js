import { LightningElement,wire,api } from 'lwc';
import getContactsBasedOnAccount from '@salesforce/apex/dataTableOperationsClass.getContactsBasedOnAccount';

const columns = [
                 {label : "First Name", fieldName: "FirstName"},
                 {label : "Last Name", fieldName: "LastName"},
                 {label : "Phone", fieldName: "Phone", type :"phone"},
                 {label : "Email", fieldName: "Email", type :"email"},
                 {label : "Title", fieldName: "Title"},
];
export default class DataTableOperations extends LightningElement {

    @api recordId;
    contactsData = [];
    columns = columns;

    @wire(getContactsBasedOnAccount,{
      accountId : "$recordId"
    })
    getContactOutput({data,error}){
    if(data){
      this.contactsData = data;
    }
    else if(error){
      console.log('Error while loading records');
    }
  }
}