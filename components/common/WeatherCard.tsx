import styles from './styles/WeatherCard.module.scss'
import Image from  'next/image'
import { Unit } from '../../hooks/useWeather'

type Props = {
    day: string;
    max: number;
    min: number;
    iconName: string;
    unit: Unit;
}

const WeatherCard: React.FC<Props> = (props: Props) => {
  return (
    <section className={styles.container}>
        <h3>{props.day}</h3>
        <Image src={`/${props.iconName}.svg`} alt="Weather State" layout="responsive" height={100} width={100} />
        <div className={styles.minMaxTemp}>
            <h4 className={styles.max}>{`${props.max}°${props.unit}`}</h4>
            <h4 className={styles.min}>{`${props.min}°${props.unit}`}</h4>
        </div>
    </section>
  )
}

export default WeatherCard