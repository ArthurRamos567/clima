
interface DataProps {
    children: React.ReactNode;

}

export default function Label(props: DataProps) {
    return (
            <p className="font-serif">{props.children}</p>
    );
}
