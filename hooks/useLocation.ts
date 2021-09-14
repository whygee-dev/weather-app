import { useEffect, useState } from "react";

export type Coordinates = {latitude: number, longitude: number};
export const defaultLocation = {latitude: 48.853401, longitude: 2.3486};

const useLocation = (refreshDate: Date): { location: Coordinates | null | undefined , state: string | undefined } => {
    const [coordinates, setCoordinates] = useState<Coordinates|null|undefined>(defaultLocation);
    const [state, setState] = useState<string>();

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.permissions.query({name:'geolocation'}).then((result) => {
                if (result.state === 'prompt' || result.state === 'granted') {
                    navigator.geolocation.getCurrentPosition((position) => {
                        setCoordinates({latitude: position.coords.latitude, longitude: position.coords.longitude});
                    }, 
                    (err) => {
                        console.log(err);
                        setCoordinates(defaultLocation);
                        setState('gps_off');
                    })
                } 

                result.onchange = () => {
                    setState(result.state);
                    if (result.state === 'denied') {
                        setCoordinates(defaultLocation);
                    }
                }
            });
        } else {
            setCoordinates(defaultLocation);
            setState('gps_off');
        }
    }, [refreshDate]);

    return { location: coordinates, state };
}

export default useLocation;