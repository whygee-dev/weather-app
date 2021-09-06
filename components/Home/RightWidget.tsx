import React from 'react'
import styles from '../../styles/RightWidget.module.scss'
import HighlightCard from '../common/HighlightCard'
import WeatherCard from '../common/WeatherCard'

const RightWidget: React.FC = () => {
  return (
    <section className={styles.container}>
        <header>
            <button className={`btn ${styles.celciusBtn}`}>°C</button>
            <button className={`btn ${styles.fahrenBtn}`}>°F</button>
        </header>
        <section className={styles.daysWeather}>
            <WeatherCard day="Tomorrow" max={16} min={11} />
            <WeatherCard day="Sun.7 Jun" max={16} min={11} />
            <WeatherCard day="Mon.8 Jun" max={16} min={11} />
            <WeatherCard day="Tue.9 Jun" max={16} min={11} />
            <WeatherCard day="Wed.10 Jun" max={16} min={11} />
        </section>

        <section className={styles.highlights}>
            <h2>{`Today\'s`} Highlights</h2>
            <section className={styles.cards}>
                <HighlightCard title="Wind Status" stat="7" unit="mph"/>
                <HighlightCard title="Wind Status" stat="7" unit="mph"/>
                <HighlightCard title="Wind Status" stat="7" unit="mph"/>
                <HighlightCard title="Wind Status" stat="7" unit="mph"/>
            </section>      
        </section>
    </section>
  )
}

export default RightWidget