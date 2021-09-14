import React, { useState } from 'react'
import useInterval from '../../hooks/useInterval'
import styles from './styles/ErrorMessage.module.scss'

type Props = {
    message?: string;
    errorDate: Date;
}

const delay = 5000;
const step = 1000;

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

    }, [props.message, props.errorDate])

    return (
        <>
            { props.message && visible && (
            <section className={styles.container}>
                {props.message}
            </section>
            )}
        </>
    );
}

export default ErrorMessage;