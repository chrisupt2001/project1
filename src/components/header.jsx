import axios from "axios";
import { useEffect, useState } from "react";

const conversions = "https://api.coindesk.com/v1/bpi/currentprice.json";


const Header = () =>
{
    const [apiCall, setApiCall] = useState({})

useEffect (() => {

    console.log('useEffect called')
    axios.get(conversions)
    .then(res => {
        const convertData = res.data;
        console.log(convertData.bpi.USD)
        setApiCall({...convertData.bpi});
})}, []);


    return(
        <>
        <button onClick={()=>console.log(apiCall)}>test</button>
        <h1>{apiCall.USD.rate}</h1>
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