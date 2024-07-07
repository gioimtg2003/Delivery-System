import { Log } from "./Log";
import https from "https";

interface IRoute {
    distance: number;
    duration: number;
}

export async function Geocoding(
    address: string
): Promise<{ lng: number; lat: number; country: string }> {
    return new Promise((resolve, reject) => {
        fetch(
            `${process.env.GEOCODE_API_URL}?q=${address}&limit=1&lang=vi_VN&in=countryCode:VNM&apiKey=${process.env.API_HERE}`
        )
            .then((res) => res.json())
            .then((json) => {
                console.log(json.items[0].address);
                resolve({
                    lat: json.items[0].position.lat,
                    lng: json.items[0].position.lng,
                    country: json.items[0].address.county,
                });
            })
            .catch((error) => {
                Log.Error(new Date(), error, "Geocoding");
                reject(error);
            });
    });
}

export async function Route(
    sender: { lat: number; lng: number },
    receiver: { lat: number; lng: number },
    type: "scooter" | "truck" | "car"
): Promise<IRoute> {
    return new Promise((resolve, reject) => {
        console.log(
            `${process.env.ROUTE_API_URL}?transportMode=${type}&origin=${sender.lat},${sender.lng}&destination=${receiver.lat},${receiver.lng}&return=summary&apiKey=${process.env.API_HERE}`
        );
        https
            .get(
                `${process.env.ROUTE_API_URL}?transportMode=${type}&origin=${sender.lat},${sender.lng}&destination=${receiver.lat},${receiver.lng}&return=summary&apiKey=${process.env.API_HERE}`,
                (res) => {
                    let data = "";
                    res.on("data", (chunk) => {
                        data += chunk;
                    });
                    res.on("end", () => {
                        let resJson = JSON.parse(data);
                        try {
                            resolve({
                                distance:
                                    resJson.routes[0].sections[0].summary
                                        .length,
                                duration:
                                    resJson.routes[0].sections[0].summary
                                        .duration,
                            });
                        } catch (error) {
                            Log.Error(new Date(), error, "Route");
                            reject(error);
                        }
                    });
                }
            )
            .on("error", (error) => {
                Log.Error(new Date(), error, "Route");
                reject(error);
            });
    });
}

export function CalculateCost(
    distance: number,
    rate: number,
    costLimit: number
): number {
    let cost = costLimit;
    const n = Math.ceil((distance - 2000) / 3000);
    for (let i = 0; i < n; i++) {
        cost += rate;
        rate *= 0.7;
    }
    return cost;
}
