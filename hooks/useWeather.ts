import { useEffect, useState } from "react";
import { Coordinates } from "./useLocation";

export type Unit = 'C' | 'F';

const useWeather = (coords: Coordinates | undefined, unit: Unit, date: Date): any => {
    const [weather, setWeather] = useState<any>();

    const lastFetch = date.getTime();

    useEffect(() => {
        const fetchData = (async () => {
            if (!coords?.latitude || !coords?.longitude) {
                return;
            }

            const request = await fetch(`${process.env.NEXT_PUBLIC_API}/weather?lat=${coords?.latitude}&lon=${coords?.longitude}&units=${unit === 'C' ? 'metric' : 'imperial'}`)
            const res = await request.json();

            setWeather(res);
        });

        fetchData();
    }, [unit, coords?.latitude, coords?.longitude, lastFetch]);

    return weather;
}

export default useWeather;