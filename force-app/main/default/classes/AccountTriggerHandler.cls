//Account not able to delete if they have more than two opportunity and amount is greater then 4000
public class AccountTriggerHandler {
    public static void preventAccDel(List<Account>accList){
        Map<Id,Account> accMap = new Map<Id,Account>();
        if(!accList.isEmpty()){
            For(Account acc : accList){
                accMap.put(acc.Id, acc);
            }
        }
        List<Opportunity> oppList = [select AccountId,Amount from Opportunity where AccountId IN: accMap.KeySet()];
        Integer OppSize = oppList.size();
        Decimal totalAmount =0;
        system.debug('oppsize'+OppSize);
        
        
        For(Opportunity opp : oppList){
            totalAmount += opp.Amount;
            system.debug('totalAmount'+totalAmount);
        }
        If(OppSize > 2 && totalAmount> 4000){
            For(Account acc : accList){
                acc.addError('You cannot delete the acc as it is having more than 2 opp and amount is greater than 4000');
            }
        }
    }
}