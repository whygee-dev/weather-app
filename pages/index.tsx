import type { NextPage } from 'next'
import React, { useEffect, useRef, useState } from 'react'
import LeftWidget from '../components/Home/LeftWidget'
import RightWidget from '../components/Home/RightWidget'
import styles from '../styles/Home.module.scss'
import useLocation, { Coordinates } from '../hooks/useLocation'
import useWeather, { Unit } from '../hooks/useWeather'
import ErrorMessage from '../components/common/ErrorMessage'
import LoadingIndicator from '../components/common/LoadingIndicator'
import SearchMenu from '../components/common/SearchMenu'

const Home: NextPage = () => {
  const [refreshDate, setRefreshDate] = useState(new Date());
  const [locationDate, setLocationDate] = useState(new Date()); 
  const [unit, setUnit] = useState<Unit>('C');
  let  { location, state, locationError } = useLocation(locationDate);
  const [coords, setCoords] = useState<Coordinates>(location!);
  const weather = useWeather(coords, unit, refreshDate);

  useEffect(() => setCoords({latitude: location?.latitude!, longitude: location?.longitude!}), [location])

  const _isValidWeather = (weather: any) => {
    return weather && weather.current
  }

  const changeUnit = (unit: Unit) => setUnit(unit);

  const isLoading = !_isValidWeather(weather);

  const refresh = () => {
    setRefreshDate(new Date());
  }

  const currentWeather = weather?.current;

  const highlights = {
    wind: currentWeather?.wind_speed, visibility: currentWeather?.visibility, 
    humidity: currentWeather?.humidity, pressure: currentWeather?.pressure,
    windDegree: currentWeather?.wind_deg,
  };

  const mainRef = useRef<any>();

  const workerRef = useRef<Worker>();
  
  useEffect(() => {
    workerRef.current = new Worker(new URL('../search-worker/worker.js', import.meta.url));

    return () => {
      workerRef.current?.terminate()
    }
  }, [])

  const changeCoords = (lon: number, lat: number) => {
    setCoords({longitude: Number(lon), latitude: Number(lat)});
    refresh();
  }

  const geolocate = () => {
    setLocationDate(new Date());
  };

  return (
    <main ref={mainRef} id="main" className={styles.container}>
      {!isLoading 
      && (
        <>
          <LeftWidget temperature={String(Math.round(weather.current.temp))} unit={unit}
            isLoading={isLoading} description={weather.current.weather[0].description} 
              weatherIcon={weather.current.weather[0].icon} useGeoloc={geolocate}
                refresh={refresh} city={weather.timezone} containerRef={mainRef}
                  searchWorker={workerRef} changeCoords={changeCoords} locationState={state!}/>
          <RightWidget unit={unit} onUnitChange={changeUnit} 
            daysWeather={weather.daily.slice(0, 5)} highlights={highlights}/>
        </>
      )}
      <ErrorMessage message={ weather?.error } />
      <LoadingIndicator visible={isLoading || state === 'prompt' } />
    </main>
  )
}

export default Home
