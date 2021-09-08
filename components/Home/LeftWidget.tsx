import styles from '../../styles/LeftWidget.module.scss';
import Image from  'next/image';
import GpsFixedIcon from '@material-ui/icons/GpsFixed';
import RoomIcon from '@material-ui/icons/Room';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import { useEffect, useState } from 'react';
import SearchMenu from '../common/SearchMenu';

const LeftWidget: React.FC = () => {
  const [searchVisible, showSearch] = useState(false);

  return (
    <section className={styles.container}>
      { !searchVisible ? (
      <>
        <header className={styles.header}>
          <button className={`btn ${styles.searchBtn}`} onClick={() => showSearch(true)}>Search for places</button>
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
              src="/09d.svg" alt="Weather Logo"
              width='300%' height='500%' className={styles.weatherStateLogo}
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
        </>
        ) : <SearchMenu database={[]} close={() => showSearch(false)} />}
    </section>
  )
}

export default LeftWidget
