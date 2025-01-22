import { LightningElement,wire } from 'lwc';
import searchRecords from '@salesforce/apex/customLookupController.searchRecords';

export default class CustomLookUp extends LightningElement {

  @wire(searchRecords,
    {
      objectApiName :'',
      searchKey : '',
    })
    outputs;
}