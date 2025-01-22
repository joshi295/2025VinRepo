Trigger ContactTrigger on Contact(Before Update,Before Insert){
    if(trigger.isBefore){
        if(trigger.isUpdate || trigger.isInsert){
            ContactTriggerHandler.conTrgMethod(trigger.new);
        }
    }
}