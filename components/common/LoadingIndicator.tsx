import React from "react";
import Loader from "react-loader-spinner";
import styles from "./styles/LoadingIndicator.module.scss";

type Props = {
    visible: boolean;
};

const LoadingIndicator: React.FC<Props> = (props: Props) => {
    return (
        <div className={`${styles.container} ${props.visible ? '': styles.hidden}`}>
            <Loader
                type="Puff"
                color="#00BFFF"
                height={100}
                width={100}
            />
        </div>
    );
};

export default LoadingIndicator;