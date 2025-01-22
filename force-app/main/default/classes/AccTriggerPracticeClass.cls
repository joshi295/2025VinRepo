public class AccTriggerPracticeClass{
    public static void accTrgMethod(List<Account>accList){
        List<Contact> ConList = new List<Contact>();    
        if(!accList.isEmpty()){
            For(Account acc : accList){
                if(acc.NumberofContacts_c__c != null && acc.NumberofContacts_c__c <=10){
                    For(Integer i=0;i<=acc.NumberofContacts_c__c;i++){
                        Contact con = new Contact();
                        con.LastName = 'Vinay Joshi'+i;
                        con.AccountId = acc.Id;
                        ConList.add(con);
                    }                   
                }                 
                else{
                    acc.addError('Max no of contacts allowed for this account is 10');
                }
            }
            insert ConList;
            system.debug('conList'+conList);
        }
    }
}