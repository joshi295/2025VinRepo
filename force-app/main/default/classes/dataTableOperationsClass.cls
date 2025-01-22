public class dataTableOperationsClass {
    @auraEnabled(cacheable=true)
    public static List<Contact> getContactsBasedOnAccount(String accountId) {

        List<Contact> conList = [select Id,FirstName,LastName,Phone,Email,Title from Contact where AccountId =:accountId];
        return conList;
    }
}