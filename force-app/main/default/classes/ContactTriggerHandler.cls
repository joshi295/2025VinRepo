//Write a trigger to prevent a Contact to either Insert or Update with "is Primary"checked.If "is Primary" check box is already 
//checked on any of the Sibling contacts associated with the account

public class ContactTriggerHandler{
    public static void conTrgMethod(List<Contact>conList){
        Set<Id>accIds = new Set<Id>();
        if(!conList.isEmpty()){
            For(Contact con : conList){
                accIds.add(con.AccountId);
            }
        }
        List<Contact> existingCon = [select AccountId, isPrimaryContact__c from contact where AccountId IN : accIds];
        Map<Id,Boolean> accToPrimaryCheck = new Map<Id,Boolean>();
        if(!existingCon.isEmpty()){
            For(Contact con : existingCon){
                if(con.isPrimaryContact__c){
                    accToPrimaryCheck.put(con.AccountId,true);
                }
            }
        }
        For(Contact con : conList){
            if(accToPrimaryCheck.containsKey(con.AccountId)&& accToPrimaryCheck.get(con.AccountId)){
                con.addError('You cannot add new contact');
            }
        }
    }
}