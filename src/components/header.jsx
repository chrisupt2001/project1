import axios from "axios";
import { useEffect, useState } from "react";


const conversions = "https://api.coindesk.com/v1/bpi/currentprice.json";


const Header = () =>
{
  
  const [apiCall, setApiCall] = useState({
        
    })

    const [currencyRates, setcurrencyRates] = useState([])

    const [USDRate, setUSDRate] = useState(0.0)
    const [EURRate, setEURRate] = useState(0.0)
    const [GBPRate, setGBPRate] = useState(0.0)
    const [AnD, setAnD] = useState(false);


useEffect (() => {

    console.log('useEffect called')
    axios.get(conversions)
    .then(res => {
        const convertData = res.data;
        console.log(convertData.bpi)
        setApiCall({...convertData.bpi});
        setUSDRate(convertData.bpi.USD.rate_float)
        setEURRate(convertData.bpi.EUR.rate_float)
        setGBPRate(convertData.bpi.GBP.rate_float)
        
        currencyRates.push(convertData.bpi.USD.rate_float);
        currencyRates.push(convertData.bpi.EUR.rate_float);
        currencyRates.push(convertData.bpi.GBP.rate_float);
        console.log(currencyRates);

})}, []);



const Ascend = () => {

  const currencyAscend = [...currencyRates];

  currencyAscend.sort((currencyRate1, currencyRate2) => currencyRate1 - currencyRate2);

  setcurrencyRates(currencyAscend);

}

  const Descend = () => {

    const currencyDescend = [...currencyRates];

    currencyDescend.sort((currencyRate1, currencyRate2) => currencyRate2 - currencyRate1);
  
    setcurrencyRates(currencyDescend);  
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

currencyRates.forEach((rate, index) => {
  results.push(
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
  <li>{USDRate}</li>
  <li>{EURRate}</li>
  <li>{GBPRate}</li>
</ul>

<br/><br/><br/>

<h1>USD, EUR, and GBP to BTC </h1>

<ul>
<li>{1/USDRate}</li>
  <li>{1/EURRate}</li>
  <li>{1/GBPRate}</li>
  </ul>
</>
    )

}

export default Header;