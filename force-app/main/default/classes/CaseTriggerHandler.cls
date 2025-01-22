// 1. Trigger on Case (after update) when Status changes from 'Working' to 'Closed'.
//2. Ensure 'AccountId' on 'Case' is not null.
//3. Update 'Account.Case_Count__c' with the total number of associated 'Cases'.
//4. Create a 'Contact' with 'LastName' = 'Case.Subject' with the same related 'Account' 
//  if no such 'Contact' exists for that 'Account'.

public class CaseTriggerHandler {
    public static void caseTrgMethod(List<Case> newCaseList){
        Set<Id> accIds = new Set<Id>();
        if(!newCaseList.isEmpty()){
            For(Case cc : newCaseList){
                if(cc.AccountId != null){
                     accIds.add(cc.AccountId);
                }
            }
        }
        List<Case> caseList = [select Id,AccountId,ContactId, status,subject from Case Where AccountId IN: accIds];
        List<Contact> conList = new List<Contact>();
        if(!caseList.isEmpty()){
            For(Case cc : caseList){
                if(cc.Status == 'Closed' && cc.AccountId != null){
                    Contact con = new Contact();
                    con.LastName = cc.Subject;
                    con.AccountId = cc.AccountId;
                    conList.add(con);
                }
            }
            system.debug('conList'+conList);
            if(!conList.isEmpty()){
                insert conList;
            }
        }
    }
   }