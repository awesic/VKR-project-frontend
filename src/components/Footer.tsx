import { Fragment } from "react";
// import {Link} from "react-router-dom";
import { Container } from "react-bootstrap";

const Footer = () => {
    return (
        <Fragment>
            <footer className="fixed bottom-0 left-0 right-0 mt-3">
                <Container>
                    <ul className="justify-content-center border-bottom mb-3">
                        {/*    <li className="nav-item"><Link to={"/home"} className={"nav-link px-2 text-body-secondary"}>На*/}
                        {/*        главную</Link>*/}
                        {/*    </li>*/}
                    </ul>
                    <p className="text-center text-body-secondary mb-3">
                        © 2023 FQW Tracker
                    </p>
                </Container>
            </footer>
        </Fragment>
    );
};
export default Footer;
