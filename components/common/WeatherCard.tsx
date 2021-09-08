import styles from '../../styles/WeatherCard.module.scss'
import Image from  'next/image'

type Props = {
    day: string;
    max: number;
    min: number;
}

const WeatherCard: React.FC<Props> = (props: Props) => {
  return (
    <section className={styles.container}>
        <h3>{props.day}</h3>
        <Image src='/03n.svg' alt="Weather State" width="100%" height="100%"/>
        <div className={styles.minMaxTemp}>
            <h4 className={styles.max}>{`${props.max}°C`}</h4>
            <h4 className={styles.min}>{`${props.min}°C`}</h4>
        </div>
    </section>
  )
}

export default WeatherCard