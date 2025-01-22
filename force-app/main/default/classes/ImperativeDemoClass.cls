public class ImperativeDemoClass {

    @auraEnabled
    public static List<Contact> getContacts(){
        
        List<Contact>conList = [select id,lastname,Account.Name from contact];
        
        return conList;
    }
}