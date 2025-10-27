import Sunny from "../assets/icon-sunny.webp";
import PartlyCloudy from "../assets/icon-partly-cloudy.webp";
import Overcast from "../assets/icon-overcast.webp";
import Fog from "../assets/icon-fog.webp";
import Drizzle from "../assets/icon-drizzle.webp";
import Rain from "../assets/icon-rain.webp";
import Snow from "../assets/icon-snow.webp";
import Storm from "../assets/icon-storm.webp";
// import Unknown from "../assets/icon-unknown.webp";

export function getWeatherIcon(code: number): string {
  if ([0, 1].includes(code)) return Sunny;
  if (code === 2) return PartlyCloudy;
  if (code === 3) return Overcast;
  if ([45, 48].includes(code)) return Fog;
  if ([51, 53, 55].includes(code)) return Drizzle;
  if ([61, 63, 65, 80, 81, 82].includes(code)) return Rain;
  if ([71, 73, 75].includes(code)) return Snow;
  if ([95, 96, 99].includes(code)) return Storm;
//   return Unknown;
}

