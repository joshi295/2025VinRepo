public class accConSaveForm {

    @auraEnabled
    public static String accConSaveMethod(String fieldsJson){
        //system.debug('fields--->'+fields);
        //List<Account> accList = new List<Account>();
        //List<Contact> conList = new List<Contact>();
        // Log the received JSON to verify its content
        System.debug('Received fields JSON: ' + fieldsJson);

        // Parse the JSON string into a map
        Map<String, String> fields = (Map<String, String>) JSON.deserialize(fieldsJson, Map<String, String>.class);

        // Log the parsed map to ensure the data is correct
        System.debug('Parsed fields map: ' + fields);

        // Handle potential null values in the map
        if (fields == null || fields.isEmpty()) {
            throw new IllegalArgumentException('Fields map is null or empty');
        }
        
        Account acc = new Account();
        acc.Name = fields.get('accName');
        acc.Phone = fields.get('accPhone');
        acc.Industry = fields.get('accIndustry');
        acc.Description = fields.get('accDescription');
        insert acc;
        
        Contact con = new Contact();
        con.LastName = fields.get('conLastName');
        con.Phone = fields.get('conPhone');
        con.AccountId = acc.Id;
        insert con;
        return acc.Id;
    }
}