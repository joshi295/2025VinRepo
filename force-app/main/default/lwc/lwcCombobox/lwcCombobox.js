import { LightningElement, track } from 'lwc';
import getAccounts from '@salesforce/apex/ComboboxClass.getAcct';
export default class LwcCombobox extends LightningElement {
    @track value = '';
    @track arrOption =[];
 /*
 // This for the directly returning the label value that we created over here now if want to do the
 // same with showing acconnt list with their name and id then do like the un commented part
    get options(){
    return [
        
            {label : 'Colour 1', value : 'Red'},
            {label : 'colour 2', value : 'Blue'}
        
    ];
    }
*/
    get options(){
        return this.arrOption;
    }

    connectedCallback(){
    getAccounts()
    .then(result => {
     let arr = [];
     for(var i = 0 ; i < result.length ; i++){
           arr.push({label : result[i].Name , value : result[i].Id})
     }
       this.arrOption = arr;
    })
    }

handleChange(event){
  this.value = event.target.value;
}
}