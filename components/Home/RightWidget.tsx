import React, { useState } from 'react'
import { Unit } from '../../hooks/useWeather'
import styles from '../../styles/RightWidget.module.scss'
import HighlightCard from '../common/HighlightCard'
import WeatherCard from '../common/WeatherCard'
import NavigationIcon from '@material-ui/icons/Navigation'
import { Line } from 'rc-progress';

type Props = {
    unit: Unit;
    daysWeather: any;
    highlights: {wind: number, visibility: number, humidity: number, pressure: number, windDegree: number};
    onUnitChange: (unit: Unit) => void;
}

const RightWidget: React.FC<Props> = (props: Props) => {
  const [currentUnit, setCurrentUnit] = useState(props.unit);
  const _toMiles = (meter: number) => {
    return parseFloat((meter*0.000621371192).toFixed(2));
  }
  const changeUnit = (unit: Unit) => {
      setCurrentUnit(unit);
      props.onUnitChange(unit);
  }

  const isMetric = () => currentUnit === 'C';

  const windDirectionWidget = 
  <NavigationIcon style={{ transformOrigin:'50% 50%', transform: `rotate(${props.highlights.windDegree + 90 }deg)`,}}/>;
  
  const humidityBar = 
  <div style={{width: '100%', height: '100%', position: 'relative'}}>
    <span style={{position: 'absolute', top: 0, left: '10%'}}>0</span>
    <span style={{position: 'absolute', top: 0, left: '49%'}}>50</span>
    <span style={{position: 'absolute', top: 0, right: '10%'}}>100</span>
    <span style={{position: 'absolute', bottom: 0, right: '10%'}}>%</span>
    <Line percent={props.highlights.humidity} strokeColor="#FFEC65" style={{width: '80%', height: '20%'}}/>
  </div>;

  return (
    <section className={styles.container}>
        <header>
            <button className={`btn ${styles.celciusBtn} ${currentUnit === 'C' && styles.active}`} onClick={() => changeUnit('C')}>°C</button>
            <button className={`btn ${styles.fahrenBtn} ${currentUnit === 'F' && styles.active}`} onClick={() => changeUnit('F')}>°F</button>
        </header>
        <section className={styles.daysWeather}>
            {props.daysWeather.map((day: any, index: number) => {
                const date = new Date();
                date.setDate(date.getDate() + index);
                const dateString = date.toLocaleDateString('default', {month: 'short', day: 'numeric', weekday: 'short' });
                const renderDay = index !== 0 ? index !== 1 ? dateString : 'Tomorrow' : 'Today';
                
                return (
                    <WeatherCard day={renderDay} iconName={day.weather[0].icon}
                        max={Math.floor(day.temp.max)} min={Math.floor(day.temp.min)} key={day.dt}
                            unit={currentUnit}
                    />
                )
            })}
        </section>

        <section className={styles.highlights}>
            <h2>{`Today\'s`} Highlights</h2>
            <section className={styles.cards}>
                <HighlightCard title="Wind speed" stat={String(props.highlights.wind)} unit={isMetric() ? 'meter/s' : 'mile/h'}
                    widget={windDirectionWidget}
                />
                <HighlightCard title="Humidity" stat={String(props.highlights.humidity)} unit="%"
                    widget={humidityBar}/>
                <HighlightCard title="Visiblity" stat={String(isMetric() ? props.highlights.visibility : _toMiles(props.highlights.visibility))} unit={isMetric() ? 'm' : 'miles'}/>
                <HighlightCard title="Air Pressure" stat={String(props.highlights.pressure)} unit="mb"/>
            </section>      
        </section>
    </section>
  )
}

export default RightWidget