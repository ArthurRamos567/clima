import Info from "./Info";
import useClima from "./useClima";
import { useEffect, useState } from "react";
import Label from "./Label";

function App() {
    const [currLocation, setCurrLocation] = useState({ latitude: -28.5, longitude: -49.5 });
    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            setCurrLocation({ latitude, longitude });
            console.log(currLocation)
        });
    }, []);

    console.log(currLocation);
    const weatherData = useClima({ lat: currLocation.latitude, long: currLocation.longitude });

    return (
        <>
            <div className="flex flex-col items-center justify-around mt-5">
                <Label
                    text={
                        "Coordenadas: " +
                        currLocation.latitude.toFixed(2).toString() +
                        ", " +
                        currLocation.longitude.toFixed(2).toString()
                    }
                ></Label>
                <Info
                    labelText="Temperatura"
                    dataArray={weatherData ? weatherData.hourly.temperature2m : new Float32Array()}
                    formatingFunction={(v) => (v ? v.toFixed(2) + "°C" : null)}
                    yMin={0}
                    yMax={45}
                ></Info>
                <Info
                    labelText="Sensação termica"
                    dataArray={weatherData ? weatherData.hourly.apparentTemperature : new Float32Array()}
                    formatingFunction={(v) => (v ? v.toFixed(2) + "°C" : null)}
                    yMin={0}
                    yMax={45}
                ></Info>
                <Info
                    labelText="Umidade do ar"
                    dataArray={weatherData ? weatherData.hourly.relativeHumidity2m : new Float32Array()}
                    formatingFunction={(v) => (v ? v.toFixed(1) + "%" : null)}
                    yMin={0}
                    yMax={100}
                ></Info>
                <Info
                    labelText="Chance de chuva"
                    dataArray={weatherData ? weatherData.hourly.precipitationProbability : new Float32Array()}
                    formatingFunction={(v) => (v ? v.toFixed(1) + "%" : null)}
                    yMin={0}
                    yMax={100}
                ></Info>

                <Info
                    labelText="Precipitação"
                    dataArray={weatherData ? weatherData.hourly.precipitation : new Float32Array()}
                    formatingFunction={(v) => (v ? v.toFixed(1) + "mm" : null)}
                    yMax={null}
                    yMin={null}
                ></Info>
            </div>
        </>
    );
}

export default App;
