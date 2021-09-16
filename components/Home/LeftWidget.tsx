import styles from "../../styles/LeftWidget.module.scss";
import Image from "next/image";
import GpsFixedIcon from "@material-ui/icons/GpsFixed";
import RoomIcon from "@material-ui/icons/Room";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import { LegacyRef, useEffect, useRef, useState } from "react";
import SearchMenu from "../common/SearchMenu";
import RefreshIcon from "@material-ui/icons/Refresh";
import { Unit } from "../../hooks/useWeather";
import GpsOffIcon from "@material-ui/icons/GpsOff";
import ReactTooltip from "react-tooltip";

type Props = {
  temperature: string;
  isLoading: boolean;
  description: string;
  city: string;
  weatherIcon: string;
  unit: Unit;
  scrollTop?: number;
  containerRef: React.MutableRefObject<any>;
  searchWorker: React.MutableRefObject<Worker | undefined>;
  locationState: string;
  changeCoords: (lon: number, lat: number) => any;
  refresh: () => void;
  useGeoloc: () => void;
};

const LeftWidget: React.FC<Props> = (props: Props) => {
  const [searchVisible, showSearch] = useState(false);
  const [scrollTop, setScrollTop] = useState(0);
  const today = new Date();

  const onScroll = () => {
    ReactTooltip.hide();
    const main = props.containerRef.current;
    setScrollTop(Math.min(window.innerHeight, main.scrollTop));
  };

  if (props.containerRef.current) {
    props.containerRef.current.addEventListener("scroll", onScroll);
  }

  const tooltipRef = useRef<any>();

  useEffect(() => {
    ReactTooltip.rebuild();
    ReactTooltip.show(tooltipRef.current);

    const timeout = setTimeout(() => {
      ReactTooltip.hide(tooltipRef.current);
    }, 10000);

    return () => {
      clearTimeout(timeout);
      ReactTooltip.hide();
    }
  }, [props.locationState]);

  return (
    <section
      className={styles.container}
      style={{ top: window.innerWidth > 768 ? scrollTop : undefined }}
    >
      {!searchVisible ? (
        <>
          <header className={styles.header}>
            <button
              className={`btn ${styles.searchBtn}`}
              onClick={() => showSearch(true)}
            >
              Search for places
            </button>
            <section className={styles.controlBtns}>
              <ReactTooltip place='bottom' effect='solid' insecure={false} />
              <button
                className={`btn ${styles.geolocBtn}`}
                onClick={props.useGeoloc}
              >
                {props.locationState === "granted" ? (
                  <GpsFixedIcon className="icon" />
                ) : (
                  <GpsOffIcon
                    className="icon"
                    ref={tooltipRef}
                    data-tip="Geocation Permission denied or GPS Off"
                  />
                )}
              </button>
              <button
                className={`btn ${styles.refreshBtn}`}
                onClick={props.refresh}
              >
                <RefreshIcon className="icon" />
              </button>
            </section>
          </header>

          <section className={styles.stateIllustration}>
            <div className={styles.clouds}>
              <div className={styles.cloudGroup1}>
                <div className={styles.cloud1}>
                  <Image
                    src="/HeavyCloud.png"
                    alt="Cloud"
                    width="150px"
                    height="200px"
                  />
                </div>

                <div className={styles.cloud2}>
                  <Image
                    src="/HeavyCloud.png"
                    alt="Cloud"
                    width="150px"
                    height="200px"
                  />
                </div>
              </div>

              <div className={styles.cloudGroup2}>
                <div className={styles.cloud3}>
                  <Image
                    src="/HeavyCloud.png"
                    alt="Cloud"
                    width="150px"
                    height="200px"
                  />
                </div>

                <div className={styles.cloud4}>
                  <Image
                    src="/HeavyCloud.png"
                    alt="Cloud"
                    width="150px"
                    height="200px"
                  />
                </div>
              </div>
            </div>

            <div className={styles.weatherStateImage}>
              <Image
                src={`/${props.weatherIcon}.svg`}
                alt="Weather Logo"
                width="250%"
                height="300%"
                className={styles.weatherStateLogo}
              />
            </div>
          </section>

          <section className={styles.weatherDesc}>
            <section className={styles.temperature}>
              <h1>
                {!props.isLoading ? (
                  <>
                    <span
                      className={styles.temperatureNumber}
                      last-number={props.temperature.slice(-1)}
                    >
                      {props.temperature.charAt(0)}
                    </span>
                    <span className={styles.degree} degree-unit={props.unit}>
                      <RadioButtonUncheckedIcon className={styles.degreeIcon} />
                    </span>
                  </>
                ) : (
                  <span>Loading...</span>
                )}
              </h1>
            </section>
            <section className={styles.weatherState}>
              {!props.isLoading && <h2>{props.description}</h2>}
            </section>
            <section className={styles.metadata}>
              <h4>
                Today
                <span className={styles.dot}>&#11827;</span>
                {today
                  .toString()
                  .substring(
                    0,
                    today.toString().indexOf(String(today.getFullYear()))
                  )}
              </h4>
              <h3>
                <RoomIcon className={styles.marker} />
                {!props.isLoading ? props.city : "Loading.."}
              </h3>
            </section>
          </section>
        </>
      ) : (
        <SearchMenu
          database={[]}
          close={() => showSearch(false)}
          searchWorker={props.searchWorker}
          changeCoords={props.changeCoords}
        />
      )}
    </section>
  );
};

LeftWidget.defaultProps = {
  temperature: "Loading temperature",
};

export default LeftWidget;
