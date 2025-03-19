import { fetchWeatherApi } from "openmeteo";
import { useEffect, useState } from "react";
const range = (start: number, stop: number, step: number) =>
    Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

export default function ({ lat, long }: { lat: number; long: number }) {
    const [weatherData, setWeatherData] = useState<{
        hourly: {
            time: Date[];
            temperature2m: Float32Array<ArrayBufferLike>;
            relativeHumidity2m: Float32Array<ArrayBufferLike>;
            precipitationProbability: Float32Array<ArrayBufferLike>;
            apparentTemperature: Float32Array<ArrayBufferLike>;
            windSpeed10m: Float32Array<ArrayBufferLike>;
            precipitation: Float32Array<ArrayBufferLike>;
        };
    } | null>(null);

    useEffect(() => {
        const params = {
            latitude: lat,
            longitude: long,
            hourly: [
                "temperature_2m",
                "relative_humidity_2m",
                "precipitation_probability",
                "apparent_temperature",
                "wind_speed_10m",
                "precipitation",
            ],
            timezone: "auto",
            forecast_days: 1,
        };

        const url = "https://api.open-meteo.com/v1/forecast";
        
        fetchWeatherApi(url, params).then((responses) => {
            // Helper function to form time ranges

            // Process first location. Add a for-loop for multiple locations or weather models
            const response = responses[0];

            // Attributes for timezone and location
            const utcOffsetSeconds = response.utcOffsetSeconds();

            const hourly = response.hourly()!;

            // Note: The order of weather variables in the URL query and the indices below need to match!
            setWeatherData({
                hourly: {
                    time: range(Number(hourly.time()), Number(hourly.timeEnd()), hourly.interval()).map(
                        (t) => new Date((t + utcOffsetSeconds) * 1000)
                    ),
                    temperature2m: hourly.variables(0)!.valuesArray()!,
                    relativeHumidity2m: hourly.variables(1)!.valuesArray()!,
                    precipitationProbability: hourly.variables(2)!.valuesArray()!,
                    apparentTemperature: hourly.variables(3)!.valuesArray()!,
                    windSpeed10m: hourly.variables(4)!.valuesArray()!,
                    precipitation: hourly.variables(5)!.valuesArray()!,
                },
            });
        });
    }, [lat, long]);
    return weatherData;
}
