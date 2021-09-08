import styles from '../../styles/SearchMenu.module.scss'
import CloseIcon from '@material-ui/icons/Close';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import SearchIcon from '@material-ui/icons/Search';

type Props = {
    database: string[];
    close: () => any;
}

const SearchMenu: React.FC<Props> = (props: Props) => {
  return (
    <section className={styles.container}>
        <header><CloseIcon onClick={props.close} className={styles.closeIcon}/></header>
        <section className={styles.search}>
            <SearchIcon className={styles.searchIcon} />
            <input type="text" name="search" placeholder="search location"/>
            <button className={`btn ${styles.searchBtn}`}>Search</button>
        </section>
        <section className={styles.searchResults}>
            <section className={styles.location}>
                <h3>London</h3>
                <ArrowForwardIosIcon className={styles.arrowIcon}/>
            </section>
        </section>
    </section>
  )
}

export default SearchMenu