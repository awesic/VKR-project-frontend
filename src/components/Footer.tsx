import { Fragment } from "react";
import { Container } from "react-bootstrap";

const Footer = () => {
    return (
        <Fragment>
            <footer className="mt-auto inset-x-0 bottom-0">
                <Container>
                    <ul className="justify-content-center border-bottom mb-3" />
                    <p className="text-center text-body-secondary mb-3">
                        © 2023 FQW Tracker
                    </p>
                </Container>
            </footer>
        </Fragment>
    );
};
export default Footer;
