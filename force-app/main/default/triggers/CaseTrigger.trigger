Trigger CaseTrigger on Case(After Update){
    if(trigger.isAfter && trigger.isUpdate){
        CaseTriggerHandler.caseTrgMethod(trigger.new);
    }
}