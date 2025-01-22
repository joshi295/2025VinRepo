import { LightningElement,track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import accConSaveMethod from '@salesforce/apex/accConSaveForm.accConSaveMethod';
import Type from '@salesforce/schema/Account.Type';

export default class AccOppInsert extends NavigationMixin (LightningElement) {
  @track accountName= '';
  @track accountPhone='';
  @track accountindustry='';
  @track accountDescription='';
  @track contactLastName='';
  @track contactPhone='';
  @track conAccName='';
  error;

  handleAccountNameChange(event){
    this.accountName = event.target.value;
    console.log('accountName...>'+this.accountName);
  }
  handleAccountPhoneChange(event){
    this.accountPhone = event.target.value;
    console.log('accountPhone...>'+this.accountPhone);
  }
  handleAccountindustryChange(event){
    this.accountindustry = event.target.value;
    console.log('account accountindustry...>'+this.accountindustry);
  }
  handleAccountDescriptionChange(event){
    this.accountDescription = event.target.value;
    console.log('account description...>'+this.accountDescription);
  }
  handleContactLastNameChange(event){
    this.contactLastName =event.target.value;
    console.log('contactLastName...>'+this.contactLastName);
  }
  handleContactPhoneChange(event){
    this.contactPhone =event.target.value;
    console.log('contactPhone...>'+this.contactPhone);
  }
  handleconAccName(event){
    this.conAccName =event.target.value;
  }

  handleOnClick(){
    const fields = {
      accName : this.accountName,
      accPhone : this.accountPhone,
      accIndustry : this.accountindustry,
      accDescription : this.accountDescription,
      conLastName : this.contactLastName,
      conPhone : this.contactPhone,
      contactAccountName : this.conAccName
    };
    const fieldsJson = JSON.stringify(fields);
    //c/calculatorconsole.log('field value...>'+JSON.stringify(this.fields));
    console.log('fieldsJson to be sent:', fieldsJson);


   // accConSaveMethod({fields : JSON.stringify(fields)})
   accConSaveMethod({fieldsJson})
  .then(accountId => {
     console.log('inside result'+accountId);
  
  

     this[NavigationMixin.Navigate]({
      type: 'standard__recordPage',
      attributes: {
        recordId: accountId,
        objectApiName: 'Account',
        actionName: 'view'
    }
  });
})
 .catch(error => 
  console.log('inside error'+error)
)
}
}