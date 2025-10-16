import axios from "axios";
import { toast } from "sonner";

export interface Coordinates {
  lat: number;
  lon: number;
  city?: string;
  country?: string;
}

export const getCurrentPosition = async (): Promise<Coordinates> => {
  const coords = await new Promise<{ lat: number; lon: number }>((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation Error"));
      toast.error("Geolocation is not supported by your browser", {
        duration: Infinity,
        closeButton: true,
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      (error) => {
        reject(new Error("Geolocation Error"));
        toast.error("Unable to retrieve your location: " + error.message, {
          duration: Infinity,
          closeButton: true,
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 50000,
        maximumAge: 0,
      }
    );
  });

  const res = await axios.get(`https://nominatim.openstreetmap.org/reverse?lat=${coords.lat}&lon=${coords.lon}&format=json`);
  if (res.status === 200) {
    const data = res.data;
    return {
      lat: coords.lat,
      lon: coords.lon,
      city: data.address.city || data.address.town || data.address.village || data.address.hamlet,
      country: data.address.country,
    };
  }else{
    toast.error("Problem fetching Location Data. Try Searching for a city", {
      duration: Infinity,
      closeButton: true,
    });
    throw new Error("Geolocation Error");
  }
};

// export const getGeoLocation = async (): Promise<Coordinates> => {
//   const res = await axios.get("https://ipapi.co/json/");
//   if (res.status !== 200)
//     throw new Error("Problem fetching Location Data. Try Searching for a city");
//   const data = res.data;
//   return {
//     lat: data.latitude,
//     lon: data.longitude,
//     city: data.city,
//     country: data.country_name,
//   };
// };

// export const getPositionCoordinates = async (): Promise<Coordinates> => {
//   let coords: Coordinates;

//   try {
//     coords = await getCurrentPosition();
//   } catch {
//     coords = await getIpLocation();
//   }

//   return coords
// }
