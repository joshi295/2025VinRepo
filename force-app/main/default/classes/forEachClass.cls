public class forEachClass {
    @auraEnabled(cacheable =true)
    public static List<Account> getAccounts() {

        List<Account> accList =[select id, Name from account];
        return accList;
    }
}