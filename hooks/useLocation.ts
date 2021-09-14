import { useEffect, useState } from "react";

export type Coordinates = {latitude: number, longitude: number};
export const defaultLocation = {latitude: 48.853401, longitude: 2.3486};

const useLocation = (refreshDate: Date): { location: Coordinates | null | undefined , state: string | undefined } => {
    const [coordinates, setCoordinates] = useState<Coordinates|null|undefined>();
    const [state, setState] = useState<string>();

    useEffect(() => {
        if ('geolocation' in navigator) {
            navigator.permissions.query({name:'geolocation'}).then((result) => {
                if (result.state === 'prompt' || result.state === 'granted') {
                    navigator.geolocation.getCurrentPosition((position) => {
                        setCoordinates({latitude: position.coords.latitude, longitude: position.coords.longitude});
                    })
                } else if (result.state === 'denied') {
                    setCoordinates(defaultLocation);
                }

                result.onchange = () => {
                    setState(result.state);
                    if (result.state === 'denied') {
                        setCoordinates(defaultLocation);
                    }
                }
            });
        } else {
            setCoordinates(null);
        }
    }, [refreshDate]);

    return { location: coordinates, state };
}

export default useLocation;