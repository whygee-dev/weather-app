import { useEffect, useState } from "react";

type Unit = 'C' | 'F';

const useWeather = (coords: GeolocationCoordinates | undefined, unit: Unit): { weather: any, error: unknown } => {
    const [weather, setWeather] = useState<any>();
    const [error, setError] = useState<unknown>();

    useEffect(() => {
        const fetchData = (async () => {
            console.log(coords?.latitude);
            console.log(coords?.longitude);
            try {
                if (!coords?.latitude || !coords?.longitude) {
                    return;
                }

                const request = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${coords?.latitude}&lon=${coords?.longitude}&units=${unit === 'C' ? 'imperial' : 'metric'}&appid=${process.env.NEXT_PUBLIC_API_KEY}`
                );
                
                const res = await request.json();

                setWeather(res);   
            } catch (error) {
                setError(error);
            }
        });

        fetchData();
    }, [unit, coords?.latitude, coords?.longitude]);

    return { weather, error };
}

export default useWeather;