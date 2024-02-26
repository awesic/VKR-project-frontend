import intro from "@/assets/images/intro.jpg";
import styled from "styled-components";
import { Button, Container } from "react-bootstrap";

const Styles = styled.div`
    .intro-page {
        background: url(${intro}) no-repeat center center;
        background-size: cover;
        height: 80vh;
        width: 100%;
    }
`;

export default function IntroPage() {
    return (
        <>
            <Styles>
                <Container className={"my-5"}>
                    <div
                        className={
                            "p-5 text-center rounded-3 intro-page d-flex justify-content-center"
                        }>
                        <div
                            className={
                                "d-inline-flex gap-2 mt-5 pt-4 align-self-center"
                            }>
                            <Button
                                href={"/login"}
                                className={
                                    "mt-5 mx-3 d-inline-flex align-items-center btn btn-light btn-lg px-4 rounded-pill"
                                }>
                                Вход
                            </Button>
                            <Button
                                href={"/sign-up"}
                                className={
                                    "mt-5 mx-3 btn btn-secondary btn-lg px-4 rounded-pill"
                                }>
                                Регистрация
                            </Button>
                        </div>
                    </div>
                </Container>
            </Styles>
        </>
    );
}
