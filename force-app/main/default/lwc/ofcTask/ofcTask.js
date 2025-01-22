import { LightningElement, track} from 'lwc';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import {createRecord} from 'lightning/uiRecordApi';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import OPPORTUNITY_OBJECT from '@salesforce/schema/Opportunity';
import Account_Name_Field from '@salesforce/schema/Account.Name';
import Account_Phone_Field from '@salesforce/schema/Account.Phone';
import Account_Website_Field from '@salesforce/schema/Account.Website';
import Account_Industry_Field from '@salesforce/schema/Account.Industry';
import Account_Description_Field from '@salesforce/schema/Account.Description';

import Opportuninty_Name_Filed from '@salesforce/schema/Opportunity.Name';
import Opportunity_Stage_Field from '@salesforce/schema/Opportunity.StageName';
import Opportunity_Amount_Field from '@salesforce/schema/Opportunity.Amount';
import Opportunity_CloseDate_Field from '@salesforce/schema/Opportunity.CloseDate';
import Opportunity_Description_Field from '@salesforce/schema/Opportunity.Description';
import Opportunity_AccountId_Field from '@salesforce/schema/Opportunity.AccountId';

export default class OfcTask extends LightningElement {

    @track accountName = '';
    @track accountPhone = '';
    @track accountWebsite = '';
    @track accountIndustry = '';
    @track accountDescription = '';

    @track opportunityName = '';
    @track opportunityStage = '';
    @track opportunityAmount = '';
    @track opportunityCloseDate = '';
    @track opportunityDescription = '';

    handleInputChange(event) {
        const field = event.target.dataset.id;
        this[field] = event.target.value;
    }

    handleSave() {
        // Create Account record
        const accountFields = {};
        accountFields[Account_Name_Field.fieldApiName] = this.accountName;
        accountFields[Account_Phone_Field.fieldApiName] = this.accountPhone;
        accountFields[Account_Website_Field.fieldApiName] = this.accountWebsite;
        accountFields[Account_Industry_Field.fieldApiName] = this.accountIndustry;
        accountFields[Account_Description_Field.fieldApiName] = this.accountDescription;

        const accountRecordInput = { apiName: ACCOUNT_OBJECT.objectApiName, fields: accountFields };

        createRecord(accountRecordInput)
            .then(account => {
                // Account created successfully, now create Opportunity
                const opportunityFields = {};
                opportunityFields[Opportuninty_Name_Filed.fieldApiName] = this.opportunityName;
                opportunityFields[Opportunity_Stage_Field.fieldApiName] = this.opportunityStage;
                opportunityFields[Opportunity_Amount_Field.fieldApiName] = this.opportunityAmount;
                opportunityFields[Opportunity_CloseDate_Field.fieldApiName] = this.opportunityCloseDate;
                opportunityFields[Opportunity_Description_Field.fieldApiName] = this.opportunityDescription;
                opportunityFields[Opportunity_AccountId_Field.fieldApiName] = account.id;

                const opportunityRecordInput = { apiName: OPPORTUNITY_OBJECT.objectApiName, fields: opportunityFields };

                createRecord(opportunityRecordInput)
                    .then(() => {
                        this.dispatchEvent(
                            new ShowToastEvent({
                                title: 'Success',
                                message: 'Account and Opportunity created successfully!',
                                variant: 'success'
                            })
                        );
                        this.resetForm();
                    })
                    .catch(error => {
                        this.dispatchEvent(
                            new ShowToastEvent({
                                title: 'Error creating Opportunity',
                                message: error.body.message,
                                variant: 'error'
                            })
                        );
                    });
            })
            .catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error creating Account',
                        message: error.body.message,
                        variant: 'error'
                    })
                );
            });
    }

    resetForm() {
        this.accountName = '';
        this.accountPhone = '';
        this.accountWebsite = '';
        this.accountIndustry = '';
        this.accountDescription = '';

        this.opportunityName = '';
        this.opportunityStage = '';
        this.opportunityAmount = '';
        this.opportunityCloseDate = '';
        this.opportunityDescription = '';
    }
}