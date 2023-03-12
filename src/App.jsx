import { useEffect, useState } from "react"
import ConversionRates from "./components/ConvertRates";
import Conversion from "./components/Conversion";
import axios from "axios";

function App() {

  const [components, setComponents] = useState('')
  const [Time,setTime] = useState(null)

  useEffect(() => {
    axios.get('https://api.coindesk.com/v1/bpi/currentprice.json').then( response =>{
      
      const UTC = new Date(response.data.time.updatedISO);
      const EST = UTC.toLocaleString();

      setTime({
        ...response.data,
        EST : EST
      })
  })},[]);

  
  const Rates = () => {
    setComponents('rates')
  }

  const Sort = () => {
    setComponents('sort')
  }

  if (!Time) {
    return <p>Loading...</p>
  }

  return (
    <div className="App w-[50%] mx-auto py-5">
      <p>UTC time: {Time.time.updatedISO}</p>
      <p>EST: {Time.EST}</p>
      <nav class="flex justify-center gap-5">
      <button onClick={Rates} className="relative inline-block text-lg group">
          <span className="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
          <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
          <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
          <span className="relative">Current Rates</span>
          </span>
          <span className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0" data-rounded="rounded-lg"></span>
        </button>
      <button onClick={Sort} className="relative inline-block text-lg group">
          <span className="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
          <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
          <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
          <span className="relative">Conversion Rates</span>
          </span>
          <span className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0" data-rounded="rounded-lg"></span>
        </button>

      </nav>


    <section className="py-5">
      {components === 'rates' && <ConversionRates />}
      {components ==='sort' && <Conversion />}
    </section>
    </div>
  )
}

export default App
