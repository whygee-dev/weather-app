import { useEffect, useState } from "react";

const useLocation: () => GeolocationPosition | undefined = () => {
    const [geolocation, setGeolocation] = useState<GeolocationPosition|undefined>();

    useEffect(() => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                setGeolocation(position);
            })
        } else {
            setGeolocation(undefined);
        }
    }, []);

    return geolocation;
}

export default useLocation;