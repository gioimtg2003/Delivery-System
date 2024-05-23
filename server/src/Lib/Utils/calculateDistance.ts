export function calculateDistance(
    lat1: number,
    lng1: number,
    lat2: number,
    lng2: number
): Promise<number> {
    return new Promise((resolve, reject) => {
        const R = 6371;
        var dlon = (Math.PI / 180) * (lng2 - lng1);
        var dlat = (Math.PI / 180) * (lat2 - lat1);
        var ra1 = (Math.PI / 180) * lat1;
        var ra2 = (Math.PI / 180) * lat2;
        var a =
            Math.sin(dlat / 2) * Math.sin(dlat / 2) +
            Math.cos(ra1) *
                Math.cos(ra2) *
                Math.sin(dlon / 2) *
                Math.sin(dlon / 2);
        var c = 2 * Math.asin(Math.sqrt(a));
        resolve(R * c);
    });
}
