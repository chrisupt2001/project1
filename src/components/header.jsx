import axios from "axios";
import { useEffect, useState } from "react";

const conversions = "https://api.coindesk.com/v1/bpi/currentprice.json";


const Header = () =>
{
    const [apiCall, setApiCall] = useState({
        
    })

    const [USDRate, setUSDRate] = useState(0.0)
    const [EURRate, setEURRate] = useState(0.0)
    const [GBPRate, setGBPRate] = useState(0.0)

useEffect (() => {

    console.log('useEffect called')
    axios.get(conversions)
    .then(res => {
        const convertData = res.data;
        console.log(convertData.bpi)
        setApiCall({...convertData.bpi});
        setUSDRate(convertData.bpi.USD.rate)
        setEURRate(convertData.bpi.EUR.rate)
        setGBPRate(convertData.bpi.GBP.rate)
})}, []);


    return(
        <>
        <button onClick={()=>console.log(apiCall)}>test</button>
        <h1>{USDRate}</h1>
        <ul>
  <li><a href="default.asp">Home</a></li>
  <li><a href="news.asp">News</a></li>
  <li><a href="contact.asp">Contact</a></li>
  <li><a href="about.asp">About</a></li>
</ul>
</>
    )

}

export default Header;