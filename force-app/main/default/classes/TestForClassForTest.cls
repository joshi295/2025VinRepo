@isTest
public class TestForClassForTest {
    @testSetup
    static void setup() {
        // Create test data
        List<Account> testAccounts = new List<Account>();
        for (Integer i = 0; i < 5; i++) {
            testAccounts.add(new Account(Name = 'Test Account ' + i, Industry = 'Old Industry'));
        }
        insert testAccounts;
    }
    
    @isTest
    static void testUpdateIndustry() {
        // Retrieve the test data
        List<Account> accounts = [SELECT Id, Industry FROM Account WHERE Name LIKE 'Test Account%'];
        List<Id> accountIds = new List<Id>();
        for (Account acc : accounts) {
            accountIds.add(acc.Id);
        }
        
        // Update the industry field
        String newIndustry = 'New Industry';
        ClassForTest.updateIndustry(accountIds, newIndustry);
        
        // Verify that the industry field was updated
        List<Account> updatedAccounts = [SELECT Id, Industry FROM Account WHERE Id IN :accountIds];
        for (Account acc : updatedAccounts) {
            System.assertEquals(newIndustry, acc.Industry, 'Industry should be updated to ' + newIndustry);
        }
    }
}