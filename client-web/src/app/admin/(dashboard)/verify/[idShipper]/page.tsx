export default function PageVerifyShipper({
    params,
}: {
    params: { idShipper: string };
}) {
    return (
        <div>
            <h1>PageVerifyShipper</h1>
            <p>idShipper: {params.idShipper}</p>
        </div>
    );
}
