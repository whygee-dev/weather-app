import type { NextPage } from 'next'
import React from 'react'
import LeftWidget from '../components/Home/LeftWidget'
import RightWidget from '../components/Home/RightWidget'
import styles from '../styles/Home.module.scss'

const Home: NextPage = () => {
  return (
    <main className={styles.container}>
      <LeftWidget></LeftWidget>
      <RightWidget></RightWidget>
    </main>
  )
}

export default Home
