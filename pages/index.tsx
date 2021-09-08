import type { NextPage } from 'next'
import React, { useEffect } from 'react'
import LeftWidget from '../components/Home/LeftWidget'
import RightWidget from '../components/Home/RightWidget'
import styles from '../styles/Home.module.scss'
import useLocation from '../hooks/useLocation'
import useWeather from '../hooks/useWeather'

const Home: NextPage = () => {
  const location = useLocation();
  
  const weather = useWeather(location?.coords, 'C');

  
  return (
    <main className={styles.container}>
      <LeftWidget/>
      <RightWidget/>
    </main>
  )
}

export default Home
