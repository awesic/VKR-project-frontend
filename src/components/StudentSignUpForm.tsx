import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { baseFormSchema } from "./AdminSignUpForm";
import { z } from "zod";
import { cn } from "@/lib/utils";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Check, ChevronsUpDown } from "lucide-react";
import CSRFToken from "@/components/CSRFToken";
// import DjangoCSRFToken from "django-react-csrftoken";
import { zodResolver } from "@hookform/resolvers/zod";
import { ScrollArea } from "./ui/scroll-area";
import {
    useFetchInstDirecDepartQuery,
    useGetUserInfo,
    useRegisterQuery,
} from "@/features/queries";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select";
import { useNavigate } from "react-router-dom";
import { MainFormFields } from "./MainFormFields";

const studentFormSchema = baseFormSchema
    .extend({
        role: z.string().default("student"),
        institute: z.string({
            required_error: "Это поле обязательно для заполнения",
        }),
        direction: z.string({
            required_error: "Это поле обязательно для заполнения",
        }),
        group: z
            .string({
                required_error: "Это поле обязательно для заполнения",
            })
            .min(3, { message: "Это поле обязательно" }),
        graduate_year: z.coerce
            .number({
                required_error: "Это поле обязательно для заполнения",
            })
            .min(new Date().getFullYear(), {
                message: "Неправильный год выпуска",
            })
            .default(new Date().getFullYear()),
    })
    .refine((data) => data.password === data.password2, {
        path: ["password2"],
        message: "Пароли не совпадают!",
    });

type StudentFormSchema = z.infer<typeof studentFormSchema>;

const StudentSignupForm = () => {
    const { data: institutes } = useFetchInstDirecDepartQuery({
        option: "institutes",
    });
    const { data: directions } = useFetchInstDirecDepartQuery({
        option: "directions",
    });
    const yearsArray = Array.from(
        Array(
            new Date().getFullYear() + 4 - new Date().getFullYear() + 1
        ).keys()
    ).map((x) => x + new Date().getFullYear());

    const { isSuccess } = useGetUserInfo();
    const { error, isPending, mutate: register } = useRegisterQuery();

    const form = useForm<StudentFormSchema>({
        resolver: zodResolver(studentFormSchema),
        defaultValues: {
            // graduate_year: new Date().getFullYear(),
        },
    });
    const navigate = useNavigate();

    const onSubmit = (data: StudentFormSchema) => {
        register(data);
    };

    useEffect(() => {
        if (isSuccess) navigate("/home");
    }, [isSuccess]);

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className={"min-w-min space-y-3 text-center"}>
                <CSRFToken />
                {/* <DjangoCSRFToken /> */}
                <FormLabel className={"text-start text-danger"}>
                    {error ? error.message : ""}
                </FormLabel>
                <MainFormFields form={form} />
                <FormField
                    control={form.control}
                    name="institute"
                    render={({ field }) => (
                        <FormItem>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant="outline"
                                            role="combobox"
                                            className={cn(
                                                "min-w-[16rem] justify-between",
                                                !field.value &&
                                                    "text-muted-foreground"
                                            )}>
                                            {field.value
                                                ? institutes?.find(
                                                      (institute) =>
                                                          institute.id ===
                                                          field.value
                                                  )?.label
                                                : "Институт *"}
                                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="min-w-[16rem] p-0">
                                    <Command>
                                        <CommandInput placeholder="Поиск..." />
                                        <CommandEmpty>
                                            Ничего не найдено.
                                        </CommandEmpty>
                                        <CommandGroup>
                                            {institutes?.map((institute) => (
                                                <CommandItem
                                                    value={institute.label}
                                                    key={institute.id}
                                                    onSelect={() => {
                                                        form.setValue(
                                                            "institute",
                                                            institute.id
                                                        );
                                                    }}>
                                                    <Check
                                                        className={cn(
                                                            "mr-2 h-4 w-4",
                                                            institute.id ===
                                                                field.value
                                                                ? "opacity-100"
                                                                : "opacity-0"
                                                        )}
                                                    />
                                                    {institute.label}
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="direction"
                    render={({ field }) => (
                        <FormItem>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant="outline"
                                            role="combobox"
                                            className={cn(
                                                "min-w-[16rem] justify-between",
                                                !field.value &&
                                                    "text-muted-foreground"
                                            )}>
                                            {field.value
                                                ? directions?.find(
                                                      (direction) =>
                                                          direction.id ===
                                                          field.value
                                                  )?.label
                                                : "Направление *"}
                                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="min-w-[16rem] p-0">
                                    <Command>
                                        <CommandInput placeholder="Поиск..." />
                                        <CommandEmpty>
                                            Ничего не найдено.
                                        </CommandEmpty>
                                        <CommandGroup>
                                            <ScrollArea className="h-72">
                                                {directions?.map(
                                                    (direction) => (
                                                        <CommandItem
                                                            value={
                                                                direction.label
                                                            }
                                                            key={direction.id}
                                                            onSelect={() => {
                                                                form.setValue(
                                                                    "direction",
                                                                    direction.id
                                                                );
                                                            }}>
                                                            <Check
                                                                className={cn(
                                                                    "mr-2 h-4 w-4",
                                                                    direction.id ===
                                                                        field.value
                                                                        ? "opacity-100"
                                                                        : "opacity-0"
                                                                )}
                                                            />
                                                            {direction.label}
                                                        </CommandItem>
                                                    )
                                                )}
                                            </ScrollArea>
                                        </CommandGroup>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="group"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    placeholder="Группа *  Например: ПИ4-1"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}></FormField>
                <FormField
                    control={form.control}
                    name="graduate_year"
                    render={({ field }) => (
                        <FormItem className="text-start">
                            <Select onValueChange={field.onChange}>
                                <FormControl
                                    className={cn(
                                        !field.value && "text-muted-foreground"
                                    )}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Год выпуска *" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {yearsArray.map((value) => (
                                        <SelectItem
                                            key={value}
                                            value={value.toString(10)}>
                                            {value}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}></FormField>

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
export default StudentSignupForm;
