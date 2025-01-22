trigger OpportunityTrigger on Opportunity (After insert, After update,after delete) {

    if(Trigger.isAfter){
        if(trigger.isInsert || trigger.isUpdate){
            OpportunityHandlerClass.highOppFetch(trigger.new);
        }
    }
}