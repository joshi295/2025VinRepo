import { LightningElement } from 'lwc';
import {countryCodeList} from 'c/countryCodeList';
import currencyConverterAssets from '@salesforce/resourceUrl/currencyConverterAssets'

export default class CurrencyConverterApp extends LightningElement {
  currencyImage = currencyConverterAssets + '/currencyConverterAssets/currency.svg';
  countryList =countryCodeList;
  countryFrom = "USD";
  countryTo = "AUD";
  amount = '';

  handleChange(event){
    const {name, value}= event.target
    console.log("name", name);
    console.log("value", value);
    this[name] = value;
  }
  submitHandler(event){
    event.preventDefault();//to avooid the page reload as we are using submit in form tag of html
    this.convert();
  }
  //here we are using async await to get the response, we can use then and promise as well

  async convert(){
    // const API_URL = `https://api.exchangerate.host/convert?access_key=${AUTH_KEY}&from=${this.countryFrom}&to=${this.countryTo}`
    const API_KEY = '8f1b4ac1b0daa1abe3474bd7'
    const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${this.countryFrom}/${this.countryTo}`
    try{
      const data = await fetch(API_URL)
      const jsonData = await data.json()
      debugger;
      // this.result = (Number(this.amount) * jsonData.result).toFixed(2)
      this.result = (Number(this.amount) * jsonData.conversion_rate).toFixed(2)
      console.log(this.result)
    } catch(error){
      console.log(error)
      this.error="An error occurred. Please try again..."
    }
  }
}