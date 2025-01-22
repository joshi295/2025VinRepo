public class ComboboxClass {

    @auraEnabled
    public static List<Account> getAcct(){
        List<Account>acList = [select Name, Id from account];
        return acList;
    } 
}