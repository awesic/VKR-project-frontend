import { Spinner } from "react-bootstrap";

const Loading = () => {
    return (
        <>
            <div
                className={
                    "container flex justify-content-center align-items-center"
                }
                style={{ height: "90vh" }}>
                <Spinner variant={"secondary"} animation={"border"} />
            </div>
        </>
    );
};

const SpinnerCenter = () => {
    return (
        <div className="flex justify-center align-items-center">
            <Spinner variant="secondary" animation={"border"} />
        </div>
    );
};
export { Loading, SpinnerCenter };
