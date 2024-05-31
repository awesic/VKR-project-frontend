import { useEffect } from "react";
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
import { Button } from "@/components/ui/button";
import { Loader2, Check, ChevronsUpDown } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { ScrollArea } from "./ui/scroll-area";
import {
    useFetchInstDirecDepartQuery,
    useGetUserInfo,
    useRegisterQuery,
} from "@/features/queries";
import { useForm } from "react-hook-form";
import { MainFormFields } from "./MainFormFields";

const teacherFormSchema = baseFormSchema
    .extend({
        role: z.string().default("teacher"),
        institute: z.string({
            required_error: "Это поле обязательно для заполнения",
        }),
        department: z.number({
            required_error: "Это поле обязательно для заполнения",
        }),
    })
    .refine((data) => data.password === data.password2, {
        path: ["password2"],
        message: "Пароли не совпадают!",
    });

type TeacherFormSchema = z.infer<typeof teacherFormSchema>;

const TeacherSignupForm = () => {
    const { data: institutes } = useFetchInstDirecDepartQuery({
        option: "institutes",
    });
    const { data: departments } = useFetchInstDirecDepartQuery({
        option: "departments",
    });

    const form = useForm<TeacherFormSchema>({
        resolver: zodResolver(teacherFormSchema),
    });

    const navigate = useNavigate();

    const { isSuccess } = useGetUserInfo();
    const { error, isPending, mutate: register } = useRegisterQuery();

    const onSubmit = (data: TeacherFormSchema) => {
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
                                                    id={institute.label}
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
                    name="department"
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
                                                ? departments?.find(
                                                      (department) =>
                                                          +department.id ===
                                                          field.value
                                                  )?.label
                                                : "Кафедра *"}
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
                                                {departments?.map(
                                                    (department) => (
                                                        <CommandItem
                                                            id={
                                                                department.label
                                                            }
                                                            key={department.id}
                                                            onSelect={() => {
                                                                form.setValue(
                                                                    "department",
                                                                    +department.id
                                                                );
                                                            }}>
                                                            <Check
                                                                className={cn(
                                                                    "mr-2 h-4 w-4",
                                                                    +department.id ===
                                                                        field.value
                                                                        ? "opacity-100"
                                                                        : "opacity-0"
                                                                )}
                                                            />
                                                            {department.label}
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
export default TeacherSignupForm;
