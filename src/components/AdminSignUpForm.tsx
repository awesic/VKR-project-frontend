import { z } from "zod";
import { Form, FormLabel } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import CSRFToken from "@/components/CSRFToken";
// import DjangoCSRFToken from "django-react-csrftoken";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGetUserInfo, useRegisterQuery } from "@/features/queries";
import { MainFormFields } from "./MainFormFields";

export const baseFormSchema = z.object({
    email: z
        .string({ required_error: "Это поле обязательно для заполнения" })
        .email({ message: "Неправильный формат почты" }),
    password: z
        .string({ required_error: "Это поле обязательно для заполнения" })
        .min(3, { message: "Пароль слишком короткий" }),
    password2: z
        .string({ required_error: "Это поле обязательно для заполнения" })
        .min(3, { message: "Повторите пароль" }),
    first_name: z
        .string({ required_error: "Это поле обязательно для заполнения" })
        .min(3, { message: "Имя должно быть не менее 3 букв" }),
    last_name: z
        .string({ required_error: "Это поле обязательно для заполнения" })
        .min(3, { message: "Фамилия должна быть не менее 3 букв" }),
    patronymic: z.string().default(""),
    role: z.string().default("admin"),
});

const adminFormSchema = baseFormSchema.refine(
    (data) => data.password === data.password2,
    {
        path: ["password2"],
        message: "Пароли не совпадают!",
    }
);

type AdminFormSchema = z.infer<typeof baseFormSchema>;

const AdminSignupForm = () => {
    const form = useForm<AdminFormSchema>({
        resolver: zodResolver(adminFormSchema),
    });

    const navigate = useNavigate();

    const { isSuccess } = useGetUserInfo();
    const { error, isPending, mutate: register } = useRegisterQuery();

    const onSubmit = (data: AdminFormSchema) => {
        register(data);
    };

    useEffect(() => {
        if (isSuccess) navigate("/home");
    }, [isSuccess]);

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className={"min-w-[16rem] space-y-3 text-center"}>
                <CSRFToken />
                {/* <DjangoCSRFToken /> */}
                <FormLabel className={"text-start text-danger"}>
                    {error ? error.message : ""}
                </FormLabel>
                <MainFormFields form={form} />

                <Button
                    type="submit"
                    disabled={isPending}
                    className="rounded-5 mt-4">
                    {isPending ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : null}
                    зарегистрироваться
                </Button>
            </form>
        </Form>
    );
};
export default AdminSignupForm;
