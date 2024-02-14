import { useEffect, useState } from "react";
import { Container, InputGroup } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Layout from "@/hocs/Layout";
import CSRFToken from "@/components/CSRFToken";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useGetUserInfo, useLoginQuery } from "@/features/queries";

const formSchema = z.object({
    email: z
        .string({
            required_error: "Это поле обязательно для заполнения",
        })
        .email({ message: "Неправильный формат почты" }),
    password: z
        .string({
            required_error: "Это поле обязательно для заполнения",
        })
        .min(3, { message: "Это поле обязательно для заполнения" }),
});

type FormSchema = z.infer<typeof formSchema>;

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const form = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const { isSuccess } = useGetUserInfo();
    const { mutate: login, isPending: isLoading, isError } = useLoginQuery();

    const handleSubmit: SubmitHandler<FormSchema> = (data) => {
        login(data);
    };

    useEffect(() => {
        if (isSuccess) navigate(location.state?.from?.pathname || "/home");
    }, [isSuccess]);

    return (
        <Layout title={"Вход"} content={"Страница входа"}>
            <Container
                className={
                    "justify-content-center align-items-center flex flex-column vh-100 mx-auto"
                }>
                <div
                    className={
                        "justify-content-center align-items-center fs-1 fw-bold"
                    }>
                    <div>Вход</div>
                </div>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(handleSubmit)}
                        className={"space-y-3 mw-100 form-width text-center"}>
                        <CSRFToken />
                        {isError && (
                            <FormLabel className={"text-start text-red-600"}>
                                Неправильная почта или пароль!
                            </FormLabel>
                        )}

                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    {/* <FormLabel>Почта</FormLabel> */}
                                    <FormControl>
                                        <Input placeholder="Почта" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}></FormField>
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    {/* <FormLabel>Пароль</FormLabel> */}
                                    <InputGroup className="flex-nowrap">
                                        <FormControl>
                                            <Input
                                                placeholder="Пароль"
                                                type={
                                                    showPassword
                                                        ? "text"
                                                        : "password"
                                                }
                                                {...field}
                                            />
                                        </FormControl>
                                        <InputGroup.Text
                                            onClick={() =>
                                                setShowPassword((prev) => !prev)
                                            }>
                                            {showPassword ? (
                                                <EyeOff />
                                            ) : (
                                                <Eye />
                                            )}
                                        </InputGroup.Text>
                                    </InputGroup>
                                    <FormMessage />
                                </FormItem>
                            )}></FormField>

                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="rounded-5 mt-4">
                            {isLoading ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : null}
                            ВОЙТИ
                        </Button>
                    </form>
                </Form>
                <div className={"mt-3"}>
                    <p className={"mb-0 text-center"}>
                        Еще нет аккаунта?{" "}
                        <Link
                            to={"/sign-up"}
                            className={"text-primary fw-bold"}>
                            Зарегистрируйтесь
                        </Link>
                    </p>
                </div>
            </Container>
        </Layout>
    );
};
export default Login;
