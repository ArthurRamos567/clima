
interface DataProps {
    text: string;
}

export default function Label(props: DataProps) {
    return (
        <>
            <p className="font-serif">{props.text}</p>
        </>
    );
}
