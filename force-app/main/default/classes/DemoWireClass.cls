public class DemoWireClass {

    @auraEnabled(cacheable = true)
    public static List<Account> getAcc(){
        List<Account>acList = [select Name, Phone from account];
        return acList;
    } 
}