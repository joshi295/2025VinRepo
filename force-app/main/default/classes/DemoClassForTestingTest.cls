/*
@isTest
public class DemoClassForTestingTest {

    @isTest
    public static void calculateTest(){
        
        Integer i = DemoClassForTesting.calculate('Add',3,2);
        system.assertEquals(5,i);
    }
    @isTest
    public static void calculateTestSub(){
        
        Integer z = DemoClassForTesting.calculate('Sub',3,2);
        //system.assertEquals(1,z);
        assert.areEqual(1,z);
    }
}
*/
@isTest
public class DemoClassForTestingTest{
    
    @isTest
    public static void testAccountData(){
        
        List<Account>accList = new List<Account>();
        For(Integer i=0;i<3;i++){
            Account acc = new Account();
            acc.Name = 'Vin';
            acc.Phone ='123';
            accList.add(acc);
        }
        insert accList;
        
        List<Account> acl = DemoClassForTesting.getAccountList();
        system.assertEquals(3,acl.size());
    }
}