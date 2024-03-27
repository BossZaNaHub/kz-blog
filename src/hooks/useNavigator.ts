"use client";

import { useEffect, useState } from "react";

type UserExporeNavigator = {
  user_geo?: any;
  user_navigator?: any;
  lat?: number;
  lng?: number;
};
const useNavigator = () => {
  const [userNavigator, setUserNavigator] = useState<UserExporeNavigator>();
  useEffect(() => {
    // const fetchData = async () => {
    //   if ("geolocation" in navigator) {
    //     try {
    //       const position: GeolocationPosition = await new Promise((resolve, reject) => {
    //         navigator.geolocation.getCurrentPosition(resolve, reject);
    //       });
    //       const { latitude, longitude } = position.coords;
    //       const apiUrl = `https://geocode.xyz/${latitude},${longitude}?json=1`;
    //       try {
    //         const response = await fetch(apiUrl);
    //         const data = await response.json();
    //         console.log(data);
    //         setUserNavigator({
    //           ...userNavigator,
    //           lat: latitude,
    //           lng: longitude,
    //           user_navigator: navigator,
    //           user_geo: data,
    //         });
    //         console.log("userNavigator: ", userNavigator);
    //       } catch (error) {
    //         console.error("error fetch geocode.xyz: ", error);
    //       }
    //     } catch (error) {
    //       console.error("Geolocation is not supported by this browser.");
    //     }
    //   }
    // };
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        const apiUrl = `https://geocode.xyz/${latitude},${longitude}?json=1`;
        try {
          const response = await fetch(apiUrl);
          const data = await response.json();
          setUserNavigator({
            ...userNavigator,
            lat: latitude,
            lng: longitude,
            user_navigator: navigator,
            user_geo: data,
          });
          console.log("userNavigator: ", userNavigator);
        } catch (error) {
          console.error("error fetch geocode: ", error);
        }
      });
    } else {
    }
    // fetchData();
  }, []);

  return { userNavigator };
};

export { useNavigator };
