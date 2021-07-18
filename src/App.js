import { Container, Grid } from '@material-ui/core';
import axios from 'axios';
import "leaflet/dist/leaflet.css";
import React, { useEffect, useState } from 'react';
import './App.css';
import AppRight from './components/AppRight/AppRight';
import InfoBox from './components/InfoBox/InfoBox';
import Map from './components/Map/Map';
import Navbar from './components/Navbar/Navbar';
function App() {
  const [countries, setCountries] = useState([])
  const [mapCountries, setMapCountries] = useState([])
  const [country, setCountry] = useState('worldwide')
  const [countryInfo, setCountryInfo] = useState({})
  const [mapCenter, setMapCenter] = useState({ lat: 21, lng: 105.8 });
  const [mapZoom, setMapZoom] = useState(1);

  useEffect(() => {
    axios.get('https://disease.sh/v3/covid-19/all')
    .then(res => res.data)
    .then(data =>{
      setCountryInfo(data)
    })
  }, [])

  useEffect(() => {

    async function getCountries() {
      await axios.get('https://disease.sh/v3/covid-19/countries')
        .then(response =>  response.data)
        .then(data => {
          const countries = data.map((country) => (
            {
              name:country.country,
              value: country.countryInfo.iso3,
              flagImg:country.countryInfo.flag,
              id:country.countryInfo.id,
              cases: country.cases,

            }
          ))
          setCountries(countries)
          setMapCountries(data)
        })
    }
    getCountries()
  }, [])

  const onCountryChange = async (countryCode) => {
    setCountry(countryCode)

    const url = countryCode === 'worldwide' ?
      'https://disease.sh/v3/covid-19/all' :
      `https://disease.sh/v3/covid-19/countries/${countryCode}`

      await axios.get(url)
      .then(res => res.data)
      .then(data => {
        setCountryInfo(data)
        if(countryCode === 'worldwide') {
          setMapCenter({ lat: 21, lng: 105.8 })
          setMapZoom(1)
        } else {
          setMapCenter({lat:data.countryInfo.lat,
            lng: data.countryInfo.long})
          setMapZoom(5)
        }
      })
    }
  return (
    <div className="app">
      <Container >
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
          <div className="app_left">
          <Navbar countries={countries}
            onCountryChange={onCountryChange} 
            country={country}
          />
          <div className="app__start">
            <InfoBox title="CoronaVirus Cases" 
              cases={countryInfo.todayCases}
              total={countryInfo.cases}/>
            <InfoBox title="Recovered" 
              cases={countryInfo.todayRecovered}
              total={countryInfo.recovered}/>
            <InfoBox title="Deaths" 
              cases={countryInfo.todayDeaths}
              total={countryInfo.deaths}/>
          </div>
          <Map center={mapCenter}
            zoom={mapZoom}
            mapCountries={mapCountries}
          />
        </div>
          </Grid>

          <Grid item xs={12} md={4}>
            
            <div className="app__right">
              <AppRight countries={countries}/>
            </div>
          </Grid>
        </Grid>
      </Container >
   

    
  

    </div>
  );
  }

export default App;