import { useEffect, useState } from "react";
import axios from "axios";

const Conversion = () => {

    const [Currency, setCurrency] = useState('USD');
    const [Amount, setAmount] = useState(1);
    const [Total, setTotal] = useState(null)
    const [Sorting, setSorting] = useState('asc');
    const [Data, setData] = useState(null);
    const [FetchTime, setFetchTime] = useState(0);
    
    const handleCurrency = (event) => {
        setCurrency(event.target.value);
    }

    const handleAmount = (event) => {
        setAmount(event.target.value);
    }

    const test = () => {
        const Refresh = Date.now() - FetchTime >= 5 * 60 * 1000;
        
        if(Refresh){
            axios.get(`https://api.coindesk.com/v1/bpi/currentprice.json`).then(
                response => {
                    const getAmount = response.data.bpi[Currency].rate_float;
                    const AmtBtc = getAmount * Amount;
                    setTotal(AmtBtc);
                })
            setFetchTime(Date.now());
        }
    }

    useEffect(() => {

        const ApiData = () => {
            axios.get('https://api.coindesk.com/v1/bpi/currentprice.json').then(
                response => {
                    setData(response.data.bpi);
                }
            )
        }
        ApiData();
    
    },[FetchTime])
    
    const Sorted = () => {
        const SortingData = Object.entries(Data);

            if(Sorting === 'asc'){
                SortingData.sort((a,b) => a[1].rate_float - b[1].rate_float);
                setSorting('desc');
            }
            else {
                SortingData.sort((a,b) => b[1].rate_float - a[1].rate_float);
                setSorting('asc');
            }
            setData(Object.fromEntries(SortingData))
        }

    return <div>
        <label>
            select currency:
        </label>
        <select value={Currency} onChange={handleCurrency}>
                <option value={"USD"}>USD</option>
                <option value={"EUR"}>EUR</option>
                <option value={"GBP"}>GBP</option>
            </select>
        <br />

        <label>
            Enter Amount:
        </label>
        <input type="number" value={Amount} onChange={handleAmount}></input>
        <br />
        <button onClick={(test)}>Submit</button>
        {FetchTime !== 0 && <p>The {Amount} in Bitcoin is {Total} in {Currency}</p>}
        <br />
        <br />
        <br />
        <button onClick={Sorted}>Sort the rates!</button>
        <br />
        <br />
        {Data && Object.entries(Data).map(([key,value]) =>(
            <li key={key}>
                {key}: {value.rate_float}
            </li>
        ))}
        <br />
        <br />
        <br />
    </div>
}

export default Conversion;