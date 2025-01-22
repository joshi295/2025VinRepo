trigger ContactTriggerTask on Contact(Before insert){
    if(trigger.isBefore){
        if(trigger.isInsert){
            ContactTriggerTaskHandler.trgMethod(trigger.new);
        }
    }
}