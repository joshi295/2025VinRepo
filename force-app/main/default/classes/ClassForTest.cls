public class ClassForTest {
    public static void updateIndustry(List<Id> accountIds, String newIndustry) {
        List<Account> accountsToUpdate = [SELECT Id, Industry FROM Account WHERE Id IN :accountIds];
        
        for (Account acc : accountsToUpdate) {
            acc.Industry = newIndustry;
        }
        
        try {
            update accountsToUpdate;
        } catch (DmlException e) {
            // Handle DML exceptions
            System.debug('An error has occurred: ' + e.getMessage());
            // You can add additional error handling logic here
        }
    }
}