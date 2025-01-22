public class DemoClassForTesting {
    
/*
    public static void callMethod(){
        Integer value = calculate('Add',3,2);
        system.debug('answer is ->'+value);
    }
    */
    /*
    public static Integer calculate(String Operation, Integer num1, Integer num2){
        
        if(Operation == 'Add'){
            return num1 + num2;
        }
        else{
            return num1 - num2;
        }
    }
*/
 //-------------------------------------------------------------------------------------------
    
    public static List<Account> getAccountList(){
        
        return [Select id,name, Phone from account];
    }
}