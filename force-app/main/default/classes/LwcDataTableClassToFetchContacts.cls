public class LwcDataTableClassToFetchContacts {
     
    @auraEnabled
    public static List<Contact> editConRow(String accId,String conId, String ContactName, String ContactPhone){
		
        List<Contact> conList = new List<Contact>();
        system.debug('fields'+accId);
        system.debug('fields'+conId);
        system.debug('fields'+ContactName);  
        system.debug('fields'+ContactPhone);

        if(accId != null){
            Contact con = new contact();
            con.AccountId = accId;
            con.Id = conId;
            con.LastName = ContactName;
            con.Phone = ContactPhone;
            conList.add(con);
        }
        if(!conList.isEmpty()){
            update conList;
            system.debug('updatedConList'+conList);
            return conList;
        }
        return null;
    }
    
    
    @auraEnabled
    public static List<Contact> deleteConRow(String accId){
        List<Contact> conToDelete = [select Id, Name, Phone from Contact where Id =: accId];
        delete conToDelete;
        return conToDelete;
        
}
    @auraEnabled
    public static List<Contact> addConRow(String accId, String name, string phone){
        List<Contact> newConToAdd = new List<Contact>();
        
        Contact con = new Contact();
        con.AccountId = accId;
        con.LastName = name;
        con.Phone = phone;
        newConToAdd.add(con);
        
        if(!newConToAdd.isEmpty()){
            insert newConToAdd;   
            system.debug('List-->'+newConToAdd);
        }
        return newConToAdd;
    }
    
    @auraEnabled
    public static Boolean updatePrimaryContact(String accId, String contactRowId){
        
        List<Account> accountToUpdate = new List<Account>();
        
        Account objAcc = new Account();
        objAcc.Id = accId;
        objAcc.Primary_Contact__c = contactRowId;
        
        accountToUpdate.add(objAcc);
        
        if(!accountToUpdate.isEmpty()){
            update accountToUpdate;
            return true;
        }
        return false;
    }
    
    @auraEnabled
    public static List<Contact> getRelatedContacts(String accId){
        
        List<Contact> conList = [select Id,Name, Phone, AccountId From Contact Where AccountId = : accId];
        system.debug('conList-->'+conList);
        if(!conList.isEmpty()){
             return conList;
        }
       return null;
    }

}