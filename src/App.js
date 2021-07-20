import React, { useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Header, Footer, PageTitle } from './components/common';



import './App.css';
import { render } from 'react-dom';

function App() {
  const [stations, setStations] = useState([]);
  const [arrivalTimes, setArrivalTimes] = useState([]);
  const [ctaApiUrl, setCtaApiUrl] = useState("");
  const [stationName, setStationName] = useState("");
  
  useEffect(() => {
    let mounted = true;
    
    fetch('./cta_stations.json')
    .then(data => data.json())
      
      .then(items => {
        if(mounted) {
          setStations(items)
        }
      })
    return () => mounted = false;
  }, [])


   function handleClick (value){
   //  let url = 'http://lapi.transitchicago.com/api/1.0/ttarrivals.aspx?key=ec4447d2056249c8a6bbd0f786f1c522&outputType=JSON&mapid=40380'; 
   let url = './eta_40830.json'
     setCtaApiUrl(url, value);
     console.log(ctaApiUrl);
    fetch(url)
    .then(response => response.json())
    .then(data => {
  //   setArrivalTimes(data.ctatt.eta),
     setStationName(data.ctatt.eta[0].staNm)
  })
  }

  function calculateArrivalTime (value){
    var currentDate = new Date();
    
  }

  return (
    <div className="App">
      <Header />  
          <Switch>
            <Route path="/stations">
              <PageTitle title="stations"/>
              <div class="left_container">
              <ol id="buttons">
              {stations.map(item => <li> <button onClick={() => handleClick(item.STOPS[0].MAP_ID)} key={item.STATION_NAME}>{item.STATION_NAME}</button></li>)}
           </ol>
           </div>
           <div class="right_container"><div>{arrivalTimes.map(item => <li key={item.stpId}>{item.stpDe} {item.arrT}</li>)}</div></div>
            </Route>
            <Route path="/">
              <PageTitle title="home"/>
            </Route>
          </Switch>
      <Footer />
    </div>
  );
}


export default App;
