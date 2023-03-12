import { useEffect, useState } from "react";
import axios from "axios";
const ConversionRates = () => {

    const [USD, setUSD] = useState(0);
    const [EUR, setEUR] = useState(0);
    const [GBP, setGBP] = useState(0);
    const [FetchTime,setFetchTime] = useState(0);

    const Data = () => {
        const Refresh = Date.now() - FetchTime >= 5 * 60 * 1000;
        
        if(Refresh){
            axios.get('https://api.coindesk.com/v1/bpi/currentprice.json').then(
            response => {
                setUSD(response.data.bpi.USD.rate_float);
                setEUR(response.data.bpi.EUR.rate_float);
                setGBP(response.data.bpi.GBP.rate_float);
            })
            setFetchTime(Date.now());
        }

    }

    const USDconvert = 1 / USD;
    const EURconvert = 1 / EUR;
    const GBPconvert = 1 / GBP;

    return <div>
        <button onClick={Data}>Click Here!</button>
        <br />
        <br />
        <br />
            {USD !== 0 && <p> {USD} is equal to 1 bitcoin, as 1 Dollar will equal to {USDconvert} </p>}
            {EUR !== 0 && <p> {EUR} is equal to 1 bitcoin, as 1 Euro will equal to {EURconvert}</p>}
            {GBP !== 0 && <p> {GBP} is equal to 1 bitcoin, as 1 Pound will equal to {GBPconvert}</p>}  
        <br />
        <br />
        <br />
    </div>
}

export default ConversionRates;