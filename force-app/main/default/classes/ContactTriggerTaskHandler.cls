//When a new contact is created add account phone number in new contact other phone field
public class ContactTriggerTaskHandler{
    public static void trgMethod(List<Contact> conList){
        
        Set<Id> accIds = new Set<Id>();
        Map<Id, Account> accMap = new Map<Id,Account>();
        If(!conList.isEmpty()){
            For(Contact con : conList){
                accIds.add(con.AccountId);
            }
            system.debug('accIds'+accIds);
        }
        List<Account> accList = [select id, phone from account where Id IN: accIds];
        
        system.debug('accList'+accList);
        If(!accList.isEmpty()){
            For(Account acc : accList){
                accMap.put(acc.Id,acc);
            } 
        }
         system.debug('accMap'+accMap);
        For(Contact con : conList){
            if(accMap.containsKey(con.AccountId)){
                con.OtherPhone = accMap.get(con.AccountId).Phone;
                system.debug('OtherPhone'+con.OtherPhone);
            }
        }
         
    }  
    }