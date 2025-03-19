import { LineChart } from "@mui/x-charts/LineChart";
import Label from "./Label";

interface DataProps {
    dataArray: Float32Array;
    formatingFunction: (v: number | null) => string | null;
    labelText: string;
    yMin: number | null;
    yMax: number | null;
}
export default function Info(props: DataProps) {
    return (
        <>
            <section className="flex flex-col justify-center w-2/5 items-center mx-5">
                <Label text={props.labelText} />
                <LineChart
                    xAxis={[
                        {
                            data: [
                                0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23,
                            ],
                            min: 0,
                            max: 23,
                            valueFormatter: (v) => v.toString() + ":00h",
                        },
                    ]}
                    series={[{ data: [...props.dataArray], valueFormatter: props.formatingFunction }]}
                    yAxis={[props.yMax != undefined && props.yMin != undefined  ? { min: props.yMin, max: props.yMax } : {}]}
                    height={200}
                    width={400}
                    slotProps={{
                        loadingOverlay: { message: "Carregando dados..." },
                    }}
                />
            </section>
        </>
    );
}
