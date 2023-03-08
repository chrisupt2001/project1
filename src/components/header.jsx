import axios from "axios";
import { useEffect, useState } from "react";


const conversions = "https://api.coindesk.com/v1/bpi/currentprice.json";


const Header = () =>
{
  
  const [apiCall, setApiCall] = useState({
        
    })

    const [currencyRates, setcurrencyRates] = useState([])
    const [currencyRates2, setcurrencyRates2] = useState([])
    

    const [USDRate, setUSDRate] = useState(0.0)
    const [EURRate, setEURRate] = useState(0.0)
    const [GBPRate, setGBPRate] = useState(0.0)
    const [timeUpdate, setTimeUpdate] = useState(" ")
    const [AnD, setAnD] = useState(false);


useEffect (() => {

    console.log('useEffect called')
    axios.get(conversions)
    .then(res => {
        const temp = [];
        const temp2 = [];
        const convertData = res.data;

        var localTZ = new Date(convertData.time.updatedISO);
        
        // var hr = localTZ.getHours();
        // var min = localTZ.getMinutes();
        // var day = localTZ.getDate();
        // var month = localTZ.getMonth();
        // var yr = localTZ.getFullYear();
        // var ampm = hr >= 12 ? 'pm' : 'am';
        // hr = hr % 12;
        // hr = hr ? hr : 12; // hour '0' should be '12' not 0
        // min = min < 10 ? '0'+min : min;
        // var ltz = day + " " + month + " " + yr + " " + hr + ':' + min + ' ' + ampm;
              
        

        console.log(localTZ.toString());

const USD = {code: "USD", number: convertData.bpi.USD.rate_float};
const EUR = {code: "EUR", number: convertData.bpi.EUR.rate_float};
const GBP = {code: "GBP", number: convertData.bpi.GBP.rate_float};

const btcToUsd = {code: "USD", number: 1/convertData.bpi.USD.rate_float};
const btcToEur = {code: "EUR", number: 1/convertData.bpi.EUR.rate_float};
const btcToGbp = {code: "GBP", number: 1/convertData.bpi.GBP.rate_float};

        console.log(convertData)
        setApiCall({...convertData});
        setUSDRate(convertData.bpi.USD.rate_float)
        setEURRate(convertData.bpi.EUR.rate_float)
        setGBPRate(convertData.bpi.GBP.rate_float)
        setTimeUpdate(localTZ.toLocaleString())
        
        temp.push(USD);
        temp.push(EUR);
        temp.push(GBP);
        
        setcurrencyRates(temp);

        temp2.push(btcToUsd);
        temp2.push(btcToEur);
        temp2.push(btcToGbp);

        setcurrencyRates2(temp2);
        
        console.log(currencyRates);
})}, []);



const Ascend = () => {

  const currencyAscend = [...currencyRates];

  currencyAscend.sort((currencyRate1, currencyRate2) => currencyRate1.number - currencyRate2.number);

  setcurrencyRates(currencyAscend);

  const currencyAscend2 = [...currencyRates2];

  currencyAscend2.sort((currencyRate1, currencyRate2) => currencyRate1.number - currencyRate2.number);

  setcurrencyRates2(currencyAscend2);

}

  const Descend = () => {

    const currencyDescend = [...currencyRates];

    currencyDescend.sort((currencyRate1, currencyRate2) => currencyRate2.number - currencyRate1.number);
  
    setcurrencyRates(currencyDescend); 
    
    const currencyDescend2 = [...currencyRates2];

    currencyDescend2.sort((currencyRate1, currencyRate2) => currencyRate2.number - currencyRate1.number);
  
    setcurrencyRates2(currencyDescend2); 
  }

  const apiManCall = () => {

    console.log('useEffect called')
    axios.get(conversions)
    .then(res => {
        const temp = [];
        const temp2 = [];
        const convertData = res.data;

        var localTZ = new Date(convertData.time.updatedISO);

const USD = {code: "USD", number: convertData.bpi.USD.rate_float};
const EUR = {code: "EUR", number: convertData.bpi.EUR.rate_float};
const GBP = {code: "GBP", number: convertData.bpi.GBP.rate_float};

const btcToUsd = {code: "USD", number: 1/convertData.bpi.USD.rate_float};
const btcToEur = {code: "EUR", number: 1/convertData.bpi.EUR.rate_float};
const btcToGbp = {code: "GBP", number: 1/convertData.bpi.GBP.rate_float};

        console.log(convertData)
        setApiCall({...convertData});
        setUSDRate(convertData.bpi.USD.rate_float)
        setEURRate(convertData.bpi.EUR.rate_float)
        setGBPRate(convertData.bpi.GBP.rate_float)
        setTimeUpdate(localTZ.toLocaleString())
        
        temp.push(USD);
        temp.push(EUR);
        temp.push(GBP);
        
        setcurrencyRates(temp);

        temp2.push(btcToUsd);
        temp2.push(btcToEur);
        temp2.push(btcToGbp);

        setcurrencyRates2(temp2);
        
        console.log(currencyRates);
})

  }



const handleClick = () => {

    if (AnD == false)
    {
        Descend();
        setAnD(true);
    }
    else
    {
        Ascend();
        setAnD(false);
    }
}

const results = [];
const results2 = [];


currencyRates.forEach((rate, index) => {
  results.push(
    <div key={index}>
      <h3>{rate.code}</h3><h2>{rate.number}</h2>
      <hr />
    </div>,
  );
});

currencyRates2.forEach((rate, index) => {
  results2.push(
    <div key={index}>
      <h3>{rate.code}</h3><h2>{rate.number}</h2>
      <hr />
    </div>,
  );
});


return(
        <>

        <button onClick={handleClick} type="button" >Ascend/Descend</button>
        <button onClick={apiManCall} type="button" >Refresh</button>

        <br />

        <h1>Time/Date Updated: {timeUpdate}</h1>


        <h1>BTC to USD, EUR, and GBP</h1>
        <ul className="Currency">
  <li>{results}</li>
  
</ul>

<br/><br/><br/>

<h1>USD, EUR, and GBP to BTC</h1>

<ul className="BTC">
<li>{results2}</li>
  </ul>
</>
    )

}

export default Header;