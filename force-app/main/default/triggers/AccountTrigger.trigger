trigger AccountTrigger on Account (before delete) {

    if(trigger.isBefore){
        if(trigger.isDelete){
            AccountTriggerHandler.preventAccDel(trigger.old);
        }
    }
}