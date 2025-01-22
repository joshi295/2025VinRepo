import { LightningElement } from 'lwc';
import AlarmClockAssets from '@salesforce/resourceUrl/AlarmClockAssets'
export default class AlarmClockApp extends LightningElement {

  clockImage = AlarmClockAssets +'/AlarmClockAssets/clock.png';// as this is a zip file
  ringtone = new Audio(AlarmClockAssets +'/AlarmClockAssets/Clocksound.mp3');
  currentTime;
  hour= [];
  minute= [];
  meridiems = ["AM", "PM"];
  alarmTime;
  isAlarmSet = false;

  hourSelected;
  minuteSelected;
  meridiemSe
  isAlarmTriggered = false;
  
  get isFieldNotSelected(){
    return !(this.hourSelected && this.minuteSelected && this.meridiemSelected);
  }

  get shakeImage(){
    return this.isAlarmTriggered ? 'shake':'';
  }
  connectedCallback(){
    this.createHourOptions();
    this.createMinuteOptions();
    this.currentTimeHandler();
  }

    currentTimeHandler(){
      setInterval(() => {
      let dateTime = new Date();
      let hours = dateTime.getHours();// getHours() returns the hour from 0-23 of a date object
      let minutes = dateTime.getMinutes();
      let seconds = dateTime.getSeconds();
      let ampm = "AM";
      if(hours === 0){
        hours = 12;
        ampm = "AM";
      }
      else if(hours === 12){
        ampm = "PM";
      }
      else if(hours >= 12){
        hours = hours - 12;
        ampm = "PM";
      }
     
      hours = hours < 10 ? "0"+ hours : hours;
      minutes = minutes < 10 ? "0"+minutes : minutes;
      seconds = seconds < 10 ? "0"+seconds : seconds;
  
      this.currentTime = `${hours}:${minutes}:${seconds}:${ampm}`;
      if(this.alarmTime === `${hours}:${minutes}:${ampm}`){
        console.log("Alarm Triggered!!")
        this.isAlarmTriggered = true;
        this.ringtone.play();
        this.ringtone.loop = true; // so until and unless u clear it, it will ring
      }
  
    },1000)
  };
  
  createHourOptions(){
    for(let i=1;i<=12;i++){
      let val = i<10 ? "0"+i : i; // let val = i<10 ? `0${i}` : i;
      this.hour.push(val)
    }
  }
  createMinuteOptions(){
    for(let i=0;i<=59;i++){
      let val = i<10 ? "0"+i : i; // let val = i<10 ? `0${i}` : i;
      this.minute.push(val)
    }
  }
  optionhandler(event){
    const {label, value} = event.detail;
    if(label === "Hour(s)"){
      this.hourSelected = value;
    }
    else if(label === "Minutes(s)"){
      this.minuteSelected = value;
    }
    else if(label === "AM/PM"){
      this.meridiemSelected = value;
    }
    console.log("this.hourSelected",this.hourSelected);
    console.log("this.minuteSelected",this.minuteSelected);
    console.log("this.meridiemSelected",this.meridiemSelected);
  }

  setAlarmHandler(){
    this.alarmTime = `${this.hourSelected}:${this.minuteSelected}:${this.meridiemSelected}`;
    this.isAlarmSet =  true;
  }
  clearAlarmHandler(){
    this.isAlarmSet =  false;
    this.alarmTime ='';
    this.hourSelected =''; // in this way it is not resetting so there are many ways to reset here we will 
    // public method reset() from child to do the functionality
    this.minuteSelected ='';// in this way it is not resetting
    this.meridiemSelected ='';// in this way it is not resetting

    this.isAlarmTriggered = false;
    this.ringtone.pause();
    
    const elements =  this.template.querySelectorAll('c-clock-dropdown')
    Array.from(elements).forEach(element =>{
      element.reset("")
    })
  }

}