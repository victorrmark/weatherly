export function celsiusToFahrenheit(celsius: number): number {
  return Math.trunc((celsius * 9) / 5 + 32);
}

export function kmhToMph(kmh: number): number {
  return Math.trunc(kmh * 0.621371);
}

export function mmToInches(mm: number): number {
  return Math.trunc(mm / 25.4);
}
