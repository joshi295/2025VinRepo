// Write an apex trigger to update the account description with opportunity name that has highest amount
public class OpportunityHandlerClass {
    public static void highOppFetch(List<Opportunity> oppList){
        Set<Id>accId = new Set<Id>();
        If(!oppList.isEmpty())
        {
            For(Opportunity opp : oppList)
            {
                accId.add(opp.AccountId);
            }
        }
        Map<Id,AggregateResult>accMap = new Map<Id, AggregateResult>();
        For(AggregateResult agg : [select AccountId acid,Max(Amount)max_amount,Name from Opportunity 
                                   where AccountId IN: accId group by accountId,Name])
        {
            Id aid = (Id)agg.get('acid');
            Decimal amt = (Decimal)agg.get('max_amount');
           // String nm = (String)agg.get('Name');
            accMap.put(aid,agg);
        }
        Map<Id,String>accOppNameMap = new Map<Id,String>();
        For(Id accountId : accMap.KeySet()){
            aggregateResult agg = accMap.get('aid');
            Decimal MaxAmount = (Decimal)agg.get('amt');
            Opportunity opp = [select Name,Amount from Opportunity where AccountId = :accountId And Amount = :MaxAmount Limit 1];
            accOppNameMap.put(accountId,opp.Name);
        }
        List<Account> accListToUpdate = new List<Account>();
        for (Account acc : [SELECT Id, Description FROM Account WHERE Id IN :accOppNameMap.keySet()]) {
            acc.Description = accOppNameMap.get(acc.Id);
            accListToUpdate.add(acc);
        }
        if (!accListToUpdate.isEmpty()) {
            update accListToUpdate;
        }
    }
}