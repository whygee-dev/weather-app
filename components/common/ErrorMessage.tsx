import React, { useState } from 'react'
import useInterval from '../../hooks/useInterval'
import styles from './styles/ErrorMessage.module.scss'
import { Line } from 'rc-progress'

type Props = {
    message?: string;
}

const delay = 5000;
const step = 500;

const ErrorMessage: React.FC<Props> = (props: Props) => {
    const [progress, setProgress] = useState(delay);
    const [visible, setVisible] = useState(false);

    useInterval(() =>{
        if (progress <= step ) {
            setVisible(false);
            setProgress(0);

            return;
        }
        setProgress(progress - step);
    }, progress > 0 ? step : null);

    React.useEffect(() => {
        if (props.message !== '') {
            setProgress(delay);
            setVisible(true);
        }

    }, [props.message])

    return (
        <>
            { props.message && visible && (
            <section className={styles.container}>
                {props.message}
                <Line percent={(progress / delay) * 100} trailColor="red" strokeColor="#8b0000" style={{width: '100%', height: '5px'}} transition='ease 1s'/>
            </section>
            )}
        </>
    );
}

export default ErrorMessage;