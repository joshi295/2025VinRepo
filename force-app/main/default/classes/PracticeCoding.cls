//There are two maps of integer, string type, Write a code to show that 2nd map is a subset of 1st map
public class PracticeCoding {
    public static void method1(){
        Map<Integer,String> mp1 = new Map<Integer,String>();
        mp1.put(1,'Vinay');
        mp1.put(2,'Pushkar');
        mp1.put(3,'Varad');
        Map<Integer,String> mp2 = new Map<Integer,String>();
        mp2.put(1,'Vinay');
        mp2.put(2,'Pushkar');
        
        if(mp1 != null){
            Boolean isSubset = true;
            For(Integer key : mp2.KeySet()){
                if(!mp1.containskey(key) || mp1.get(key) != mp2.get(key)){
                    isSubset = false;
                    break;
                }
            }
            system.debug('is mp2 subset of mp1' +isSubset);
        }
    }
}