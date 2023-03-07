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
    const [AnD, setAnD] = useState(false);


useEffect (() => {

    console.log('useEffect called')
    axios.get(conversions)
    .then(res => {
        const temp = [];
        const temp2 = [];
        const convertData = res.data;
        console.log(convertData.bpi)
        setApiCall({...convertData.bpi});
        setUSDRate(convertData.bpi.USD.rate_float)
        setEURRate(convertData.bpi.EUR.rate_float)
        setGBPRate(convertData.bpi.GBP.rate_float)
        
        temp.push(convertData.bpi.USD.rate_float);
        temp.push(convertData.bpi.EUR.rate_float);
        temp.push(convertData.bpi.GBP.rate_float);
        
        setcurrencyRates(temp);

        temp2.push(1/convertData.bpi.USD.rate_float);
        temp2.push(1/convertData.bpi.EUR.rate_float);
        temp2.push(1/convertData.bpi.GBP.rate_float);

        setcurrencyRates2(temp2);
        
        console.log(currencyRates);
})}, []);



const Ascend = () => {

  const currencyAscend = [...currencyRates];

  currencyAscend.sort((currencyRate1, currencyRate2) => currencyRate1 - currencyRate2);

  setcurrencyRates(currencyAscend);

  const currencyAscend2 = [...currencyRates2];

  currencyAscend2.sort((currencyRate1, currencyRate2) => currencyRate1 - currencyRate2);

  setcurrencyRates2(currencyAscend2);

}

  const Descend = () => {

    const currencyDescend = [...currencyRates];

    currencyDescend.sort((currencyRate1, currencyRate2) => currencyRate2 - currencyRate1);
  
    setcurrencyRates(currencyDescend); 
    
    const currencyDescend2 = [...currencyRates2];

    currencyDescend2.sort((currencyRate1, currencyRate2) => currencyRate2 - currencyRate1);
  
    setcurrencyRates2(currencyDescend2); 
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
      <h2>{rate}</h2>
      <hr />
    </div>,
  );
});

currencyRates2.forEach((rate, index) => {
  results2.push(
    <div key={index}>
      <h2>{rate}</h2>
      <hr />
    </div>,
  );
});


return(
        <>

        <button onClick={handleClick} type="button" >Ascend/Descend</button>
        <h1>BTC to USD, EUR, and GBP</h1>
        <ul>
  <li>{results}</li>
  
</ul>

<br/><br/><br/>

<h1>USD, EUR, and GBP to BTC </h1>

<ul>
<li>{results2}</li>
  </ul>
</>
    )

}

export default Header;