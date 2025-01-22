public class SaveAccountAndOpportunity {
    @auraEnabled
    public static void accAndOppSaveMethod(Map<String,String> fields){
        system.debug('fields--->'+fields);
        Account acc = new Account();
      
        acc.Name = fields.get('accountName');
        acc.Phone = fields.get('accountPhone');
        acc.Website = fields.get('accountWebsite');
        acc.Name = fields.get('accountindustry');
        acc.Description = fields.get('accountDescription');
        
        Opportunity opp = new Opportunity();
        opp.Name = fields.get('opportunityName');
        opp.StageName = fields.get('opportunityStageName');
        opp.Amount = Decimal.valueOf(fields.get('opportunityAmount'));
        opp.CloseDate = Date.valueOf(fields.get('opportunityCloseDate'));
        opp.Description = fields.get('opportunityDescription');
        
        insert acc;
        Opp.AccountId = acc.Id;
        insert opp;

    }
}