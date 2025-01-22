public class BatchClass implements database.batchable<sobject> {

    public Database.QueryLocator start(Database.BatchableContext Bc){
        //String Query = 'Select Id,Name From Contact Where Name Like %Vinay Joshi%;
        return Database.getQueryLocator([Select Id,Name From Contact where Name Like '%Vinay Joshi%']);
        //system.debug(Database.getQueryLocator([Select Id,Name From Contact where Name Like '%Vinay Joshi%']));
    }
    public void execute(Database.BatchableContext Bc,List<Contact> ConList){
        //List<Contact> ccList = new List<Contact>();       
            delete conList;
            system.debug('conList'+conList);
    }
    public void finish(Database.BatchableContext Bc){
        
    }
}