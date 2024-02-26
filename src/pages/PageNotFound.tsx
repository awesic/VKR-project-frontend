import { Fragment } from "react";
import { Link } from "react-router-dom";

import notfound from "@/assets/images/notfound.jpg";

const PageNotFound = () => {
    return (
        <Fragment>
            <div
                style={{
                    background: `url(${notfound}) no-repeat center center`,
                    backgroundSize: "cover",
                    height: "100vh",
                }}>
                <div
                    className={
                        "container justify-content-center text-center h-100"
                    }>
                    <h1 className="scroll-m-20 text-5xl font-extrabold tracking-tight lg:text-6xl pt-11 mb-4">
                        404
                    </h1>
                    <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-14">
                        Page Not Found
                    </h1>
                    <Link
                        to={"/home"}
                        className={
                            "btn btn-lg btn-outline-secondary rounded-5"
                        }>
                        На главную
                    </Link>
                </div>
            </div>
        </Fragment>
    );
};
export default PageNotFound;
