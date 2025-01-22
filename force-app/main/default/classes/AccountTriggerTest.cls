@isTest
public class AccountTriggerTest {
    @isTest
    public static void testAccountDeleteWithOpportunities(){
        Account acc = new Account();
        acc.Name = 'Test Account';
        insert acc;
        
        Opportunity opp1 = new Opportunity(Name = 'Opp1',StageName = 'Prospecting',
                                           CloseDate = Date.today(),Amount = 1500,AccountId = acc.Id);
        Opportunity opp2 = new Opportunity(Name = 'Opp2',StageName = 'Prospecting',
                                           CloseDate = Date.today(),Amount = 1000,AccountId = acc.Id);
        Opportunity opp3 = new Opportunity(Name = 'Opp3',StageName = 'Prospecting',
                                           CloseDate = Date.today(),Amount = 5000,AccountId = acc.Id);
        
        insert new List<Opportunity>{opp1,opp2,opp3};
            Integer oppCount = [SELECT COUNT() FROM Opportunity WHERE AccountId = :acc.Id];
        Decimal totalAmount = 0;
        List<AggregateResult> results = [SELECT SUM(Amount) sumAmount FROM Opportunity WHERE AccountId = :acc.Id];
        
        if (!results.isEmpty() && results[0].get('sumAmount') != null) {
            totalAmount = (Decimal) results[0].get('sumAmount');
        }
        
        System.debug('Opportunity Count: ' + oppCount); // Should be 3
        System.debug('Total Amount: ' + totalAmount); // Should be 4500
        Test.startTest();
        try{
            delete acc;
            system.assert(false,'Account was deleted but it should have failed.');
        }
        catch(DmlException e){
           // system.assert(e.getMessage().contains('Account cannot be deleted as it has more than 2 opportunities with a total amount greater than 4000.'));
           system.debug(e);
        }
        Test.stopTest();
    }
  @isTest
    static void testAccountDeleteWithoutOpportunities() {
        // Create a test account
        Account accc = new Account(Name = 'Test Account Without Opps');
        insert accc;
        
        // Try to delete the account, should succeed
        Test.startTest();
        delete accc;
        Test.stopTest();
        
        // Verify the account was deleted
        //Account deletedAccount = [SELECT Id FROM Account WHERE Id = :accc.Id LIMIT 1];
        System.assertEquals(null, 'Account should have been deleted.');
    }
}