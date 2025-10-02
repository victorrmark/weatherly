import axios from "axios";

export interface Coordinates {
  latitude: number;
  longitude: number;
  city?: string;
  country?: string;
}

// const getCurrentPosition = (): Promise<Coordinates> => {
//   return new Promise((resolve, reject) => {
//     if (!navigator.geolocation) {
//       reject(new Error("Geolocation is not supported by your browser"));
//       return;
//     }

//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         resolve({
//           latitude: position.coords.latitude,
//           longitude: position.coords.longitude,
//         });
//       },
//       (error) => reject(error)
//     );
//   });
// };

export const getIpLocation = async (): Promise<Coordinates> => {
  const res = await axios.get("https://ipapi.co/json/");
  if (res.status !== 200) throw new Error("Failed to fetch IP location");
  const data = res.data;
  return {
    latitude: data.latitude,
    longitude: data.longitude,
    city: data.city,
    country: data.country_name,

  };
};

// export const getPositionCoordinates = async (): Promise<Coordinates> => {
//   let coords: Coordinates;

//   try {
//     coords = await getCurrentPosition();
//   } catch {
//     coords = await getIpLocation();
//   }

//   return coords
// }
