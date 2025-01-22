import { LightningElement,api,wire,track} from 'lwc';
import getRelatedContacts from '@salesforce/apex/LwcDataTableClassToFetchContacts.getRelatedContacts';
import { NavigationMixin } from 'lightning/navigation';
import updatePrimaryContact from '@salesforce/apex/LwcDataTableClassToFetchContacts.updatePrimaryContact';
import addConRow from '@salesforce/apex/LwcDataTableClassToFetchContacts.addConRow';
import deleteConRow from '@salesforce/apex/LwcDataTableClassToFetchContacts.deleteConRow';
import editConRow from '@salesforce/apex/LwcDataTableClassToFetchContacts.editConRow';
import { refreshApex } from '@salesforce/apex';

const actions = [
    {label : 'Assign' ,name : 'assign'},
    {label : 'View' ,name : 'view'},
    {label : 'Add', name : 'add'},
    {label : 'Edit', name : 'edit'},
    {label : 'Delete', name : 'delete'}
];

const columnData = [
    { label : 'Name' , fieldName : 'Name'},
    {  label : 'Phone' , fieldName : 'Phone'},
    { 
        type : 'action',
        typeAttributes : {rowActions : actions}
    }
]
export default class lwcDataTableRowAction extends NavigationMixin (LightningElement) {

    @api recordId; // this will give us current page recordId;
                   // now we got the id, with this id we have to fetch related contacts so have to use soql query so go
                   // to apex class

    contactData;
    columns = columnData;
    @track showAddForm = false;
    @track showEditForm = false;
    @track newContactName = '';
    @track newContactPhone = '';
    @track editContactId = '';
    @track conNameToEdit ='';
    @track conPhoneToEdit='';
    

    connectedCallback(){
        this.loadContacts();
    }

       loadContacts(){
        getRelatedContacts({accId : this.recordId})
        .then(result => {
            this.contactData = result;
            //return refreshApex(this.contactData);
            console.log('contactData'+JSON.stringify(this.contactData));
        })
        .catch(error => {
            console.log('error is-->'+JSON.stringify(error));
        })
       }

    handleRowAction(event){

        const actionName = event.detail.action.name;
        console.log('actionName-->'+JSON.stringify(actionName));

        const rowData = event.detail.row;
        console.log('rowId-->'+JSON.stringify(rowData));
        
        if(actionName === 'assign'){
            this.assignContact(rowData)
        }
        else if(actionName === 'view'){
            this.navigateToContactRecord(rowData)
        }
        else if(actionName === 'delete'){
            this.deleteMethod(rowData)
        }
        else if(actionName === 'add'){
            this.openAddForm();
        }
        else if(actionName === 'edit'){
            this.openEditForm(rowData);
        }
    }

   //methos to assign primary contact
    assignContact(row){
        console.log('row for assigining contact-->'+JSON.stringify(row));

        updatePrimaryContact({accId : this.recordId, contactRowId : row.Id})
        .then(result =>{
            console.log('result ->'+JSON.stringify(result))
        })
        .catch(error =>{
            console.log('error->'+JSON.stringify(error))
        })
    }
  // this method will navigate user to seletcted contact
    navigateToContactRecord(row){
        console.log('row to navigate To contact-->'+JSON.stringify(row));
        console.log('rowId to navigate To contact-->'+JSON.stringify(row.Id));

        this[NavigationMixin.Navigate]({
            type : 'standard__recordPage',
            attributes : {
                recordId : row.Id,
                actionName : 'view'
            }
        })
    }

    handleClick(){
        this[NavigationMixin.Navigate]({
            type:'standard__objectPage',
            attributes : {
                objectApiName : 'Contact',
                actionName : 'new'
            }
        })
    }
    openAddForm() {
        this.showAddForm = true;
    }
    handleNameChange(event) {
        this.newContactName = event.target.value;
    }

    handlePhoneChange(event) {
        this.newContactPhone = event.target.value;
    }

     // this method will add new contact with mentioned fields
    
        handleSave() {
            addConRow({ accId: this.recordId, name: this.newContactName, phone: this.newContactPhone })
                .then(result => {
                    console.log('Contact added:'+JSON.stringify(result));
                    this.showAddForm = false;
                    this.newContactName = '';
                    this.newContactPhone = '';
                    //window.location.reload(this.contactData);
                   refreshApex(this.loadContacts())
                   .then(result=>{

                   })
                   .catch(error=>{

                   });
                   //or u can use the this.loadContacts(); to refresh
                    //this.loadContacts();
                })
                .catch(error => {
                    console.error('Error adding contact:'+JSON.stringify(error));
                });
               
            }
        handleCancel() {
            this.showAddForm = false;
            this.newContactName = '';
            this.newContactPhone = '';

    }
    openEditForm(row){
        console.log('openEditForm-->'+JSON.stringify(row));
        this.showEditForm = true;
        this.editContactId = row.Id;
        this.conNameToEdit = row.Name;
        this.conPhoneToEdit = row.Phone;
    }
    
    handleEditNameChange(event){
        this.conNameToEdit = event.target.value;
    }
    handleEditPhoneChange(event){
        this.conPhoneToEdit = event.target.value;
    }
    

    handleEditSave() {
        this.showEditForm = false;
        // this method will edit the selected contact
        editConRow({accId : this.recordId, conId : this.editContactId, ContactName : this.conNameToEdit, ContactPhone : this.conPhoneToEdit})
        .then(editedConResult => {
            console.log('editedConResult-->'+JSON.stringify(editedConResult))
            refreshApex(this.loadContacts())
            .then(result=>{
    
            })
            .catch(error=>{
            });
        })
        .catch(error => {
            console.log('error is --> '+JSON.stringify(error))
        })

    }

    handleEditCancel() {
        this.showEditForm = false;
        this.newContactName = '';
        this.newContactPhone = '';

        
    }

    
  


    // this method will delete the seletcted contact
    deleteMethod(row){
        deleteConRow({accId : row.Id})
        .then(result => {
            console.log('deleted---->'+JSON.stringify(result));
            this.loadContacts();
        })
        .catch(error => {
            console.log('error--->',error);
        })
        
    }
}