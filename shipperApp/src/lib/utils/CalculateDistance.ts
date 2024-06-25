export function CalculateDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number,
): string {
  const R = 6371;
  let dlon = (Math.PI / 180) * (lng2 - lng1);
  let dlat = (Math.PI / 180) * (lat2 - lat1);
  let ra1 = (Math.PI / 180) * lat1;
  let ra2 = (Math.PI / 180) * lat2;
  let a =
    Math.sin(dlat / 2) * Math.sin(dlat / 2) +
    Math.cos(ra1) * Math.cos(ra2) * Math.sin(dlon / 2) * Math.sin(dlon / 2);
  let c = 2 * Math.asin(Math.sqrt(a));
  return (R * c).toFixed(2);
}
