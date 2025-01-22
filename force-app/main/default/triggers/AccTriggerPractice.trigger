trigger AccTriggerPractice on Account (After insert) {

    if(trigger.isAfter && trigger.isInsert){
        AccTriggerPracticeClass.accTrgMethod(trigger.new);
    }
}