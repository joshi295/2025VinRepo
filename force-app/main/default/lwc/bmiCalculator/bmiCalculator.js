import { LightningElement } from 'lwc';

export default class BmiCalculator extends LightningElement {
  Height = '';
  weight = '';
  bmiValue = '';
  result = '';

  inputHandler(event){

    //   if(event.target.name === 'height'){
    //      this.Height = event.target.value;
    //OR
    // this[name] = value;
    //  }

    const {name, value}= event.target;
    if(name === 'Height'){
      this.Height = value;
    }
    if(name === 'weight'){
      this.weight = value;}
  }
  submitHandler(event){
      event.preventDefault();
      console.log("height",this.Height);
      console.log("weight",this.weight);
      this.calculatebmi();
  }

  calculatebmi(){
    let height = Number(this.Height)/100;
    let bmi = Number(this.weight)/(height*height);
    this.bmiValue = Number(bmi.toFixed(2));
  
  if(this.bmiValue<18.5){
    this.result = 'Underweight';
  }else if(this.bmiValue>=18.5 && this.bmiValue<25){
    this.result = 'Healthy';
  }else if(this.bmiValue>=25 && this.bmiValue<30){
      this.result = 'Overwight';
  }else {
    this.result = 'Obese';
  }
  console.log("BMI value is ",this.bmiValue); 
  console.log("result",this.result);
  }

  recalculate(){
   this.Height = '';
    this.weight = '';
    this.bmiValue = '';
    this.result = '';
  }
}