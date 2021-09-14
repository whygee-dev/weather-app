import CloseIcon from '@material-ui/icons/Close';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import SearchIcon from '@material-ui/icons/Search';
import styles from './styles/SearchMenu.module.scss'
import { useEffect, useRef, useState } from 'react';

type Props = {
    database: string[];
    searchWorker: React.MutableRefObject<Worker | undefined>;
    changeCoords: (lon: number, lat: number) => any;
    close: () => any;
}
  
const SearchMenu: React.FC<Props> = (props: Props) => {
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState<{city: string, country: string, lon: number, lat: number}[]>([]);

    useEffect(() => {
        if (!props.searchWorker.current) return;

        props.searchWorker.current.onmessage = (e) => {
            setSearchResult(e.data);
        }

        props.searchWorker.current.postMessage(search);

        return () => {
            if (!props.searchWorker.current) return;

            props.searchWorker.current.onmessage = () => {};
        }
    }, [props.searchWorker, search]);

    const resultsContainerRef = useRef<any>();

    const changeCoords = (lon: number, lat: number) => {
        props.close();
        props.changeCoords(lon, lat);
    }
    
    return (
        <section className={styles.container}>
            <header><CloseIcon onClick={props.close} className={styles.closeIcon}/></header>
            <section className={styles.search}>
                <SearchIcon className={styles.searchIcon} />
                <input type="text" name="search" placeholder="search location" value={search} onChange={(e) => setSearch(e.target.value)}/>
                <button className={`btn ${styles.searchBtn}`}>Search</button>
            </section>
            <section className={styles.searchResults} ref={resultsContainerRef}>
            {
                searchResult.map(result => (
                    <section className={styles.location} key={result.city + result.country} onClick={() => changeCoords(result.lon, result.lat)}>
                        <h3>{`${result.city}, ${result.country}`}</h3>
                        <ArrowForwardIosIcon className={styles.arrowIcon}/>
                    </section>
                ))
            }
            </section>
        </section>
    )
}

export default SearchMenu