public class PracDemo {
    @auraEnabled(cacheable = true)
    public static List<Account> PracDemot() {
        List<Account>accList = [select Name, Phone from account];
        return accList;
    }
}