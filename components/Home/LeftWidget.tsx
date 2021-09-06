import styles from '../../styles/LeftWidget.module.scss';
import Image from  'next/image';
import GpsFixedIcon from '@material-ui/icons/GpsFixed';
import RoomIcon from '@material-ui/icons/Room';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';

const LeftWidget: React.FC = () => {
  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <button className={`btn ${styles.searchBtn}`}>Search for places</button>
        <button className={`btn ${styles.geolocBtn}`}><GpsFixedIcon className="icon" /></button>
      </header>

      <section className={styles.stateIllustration}>
        <div className={styles.clouds}>
          <div className={styles.cloudGroup1}>
            <div className={styles.cloud1}>
              <Image 
                src="/HeavyCloud.png" alt="Cloud" 
                width='150px' height='200px' 
              />
            </div>
            
            <div className={styles.cloud2}>
              <Image 
                src="/HeavyCloud.png" alt="Cloud" 
                width='150px' height='200px'
              />
            </div>
          </div>
          
          <div className={styles.cloudGroup2}>
            <div className={styles.cloud3}>
              <Image 
                src="/HeavyCloud.png" alt="Cloud" 
                width='150px' height='200px'
              />
            </div>

            <div className={styles.cloud4}>
              <Image 
                src="/HeavyCloud.png" alt="Cloud" 
                width='150px' height='200px'
              />
            </div>
          </div>  
        </div>

        <div className={styles.weatherStateImage}  >
          <Image 
            src="/Shower.png" alt="Shower Logo"
            layout='fill'
          />
        </div>
      </section>

      <section className={styles.weatherDesc}>
        <section className={styles.temperature}>
          <h1>
            <span className={styles.temperatureNumber} last-number="5">1</span>
              <span className={styles.degree} degree-unit="C">
                <RadioButtonUncheckedIcon className={styles.degreeIcon} />
              </span>
          </h1>
        </section>
        <section className={styles.weatherState}>
          <h2>Shower</h2>
        </section>
        <section className={styles.metadata}>
          <h4>Today <span className={styles.dot}>&#11827;</span> Fri. 5 Jun</h4>
          <h3><RoomIcon className={styles.marker}/>Helsinki</h3>
        </section>
      </section>
    </section>
  )
}

export default LeftWidget
