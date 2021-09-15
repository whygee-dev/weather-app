import { useEffect, useState } from "react";

export type Coordinates = { latitude: number; longitude: number };
export const defaultLocation = { latitude: 48.853401, longitude: 2.3486 };

const useLocation = (
  refreshDate: Date
): {
  location: Coordinates | null | undefined;
  state: string | undefined;
  locationError: string;
} => {
  const [coordinates, setCoordinates] = useState<
    Coordinates | null | undefined
  >(defaultLocation);
  const [state, setState] = useState<string>("gps_off");
  const [error, setError] = useState<string>("");

  const lastRefresh = refreshDate.getTime();

  const geolocError =
    'Please grant location access permission or turn on your GPS in order to display weather information in your region. Alternatively, manually select your region in the "Search for places" section.';

  useEffect(() => {
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    const isEdge = /Edge/.test(navigator.userAgent);

    if (navigator.geolocation) {
      if (isSafari || isEdge) {
        console.warn("Safari or edge detected");
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setCoordinates({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          },
          (err) => {
            console.error(err);

            setError(geolocError);
            setCoordinates(defaultLocation);
            setState("gps_off");
          }
        );
      } else {
        navigator.permissions.query({ name: "geolocation" }).then((result) => {
          if (result.state === "prompt" || result.state === "granted") {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                setCoordinates({
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude,
                });
              },
              (err) => {
                console.error(err);

                setError(geolocError);
                setCoordinates(defaultLocation);
                setState("gps_off");
              }
            );
          } else if (result.state === "denied") {
            setCoordinates(defaultLocation);
            setError(geolocError);
          }

          result.onchange = () => {
            setState(result.state);
          };
        });
      }
    } else {
      setCoordinates(defaultLocation);
      setState("gps_off");
      setError(geolocError);
    }
  }, [lastRefresh]);

  return { location: coordinates, state, locationError: error };
};

export default useLocation;
