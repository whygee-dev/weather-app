import styles from './styles/HighlightCard.module.scss'

type Props = {
    title: string;
    stat: string;
    unit: string;
    widget?: any;
}

const HighlightCard: React.FC<Props> = (props: Props) => {
  return (
    <section className={styles.container}>
        <h2>{props.title}</h2>
        <div className={styles.stat}>
            <h3>{props.stat}</h3>
            <h4>{props.unit}</h4>  
        </div>
        
        <div className={styles.widget}>
          {props.widget}
        </div>
    </section>
  )
}

export default HighlightCard