import React, { useEffect, useState } from 'react';
import './App.css';
import { getArrivalTimes } from 'API/services';

function MyApp() {
    const [stations, setStations] = useState([]);
  
    useEffect(() => {
      let mounted = true;
      
      fetch('http://lapi.transitchicago.com/api/1.0/ttarrivals.aspx?key=ec4447d2056249c8a6bbd0f786f1c522&mapid=stationId')
      .then(data => data.json())
        
        .then(items => {
          if(mounted) {
            setStations(items)
          }
        })
      return () => mounted = false;
    }, [])
  
    return(
      <div className="wrapper">
       <h1>Arrival Times</h1>
       <ul>
         {list.map(item => <li key={item.item}>{item.item}</li>)}
       </ul>
     </div>
    )
  }
  
  export default MyApp;