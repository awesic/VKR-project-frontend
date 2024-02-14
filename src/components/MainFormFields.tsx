import {
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { Input } from "./ui/input";
import { InputGroup } from "react-bootstrap";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

interface Props {
    form: UseFormReturn<any, any, any>;
}

export const MainFormFields = ({ form }: Props) => {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <>
            <FormField
                control={form.control}
                name="last_name"
                render={({ field }) => (
                    <FormItem>
                        {/* <FormLabel>Почта</FormLabel> */}
                        <FormControl>
                            <Input placeholder="Фамилия *" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}></FormField>
            <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                    <FormItem>
                        {/* <FormLabel>Почта</FormLabel> */}
                        <FormControl>
                            <Input placeholder="Имя *" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}></FormField>
            <FormField
                control={form.control}
                name="patronymic"
                render={({ field }) => (
                    <FormItem>
                        {/* <FormLabel>Почта</FormLabel> */}
                        <FormControl>
                            <Input placeholder="Отчество" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}></FormField>
            <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                    <FormItem>
                        {/* <FormLabel>Почта</FormLabel> */}
                        <FormControl>
                            <Input placeholder="Почта *" {...field} />
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
                                    placeholder="Пароль *"
                                    type={showPassword ? "text" : "password"}
                                    {...field}
                                />
                            </FormControl>
                            <InputGroup.Text
                                onClick={() =>
                                    setShowPassword((prev) => !prev)
                                }>
                                {showPassword ? <EyeOff /> : <Eye />}
                            </InputGroup.Text>
                        </InputGroup>
                        <FormMessage />
                    </FormItem>
                )}></FormField>
            <FormField
                control={form.control}
                name="password2"
                render={({ field }) => (
                    <FormItem>
                        {/* <FormLabel>Почта</FormLabel> */}
                        <FormControl>
                            <Input
                                type="password"
                                placeholder="Подтверждение пароля *"
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}></FormField>
        </>
    );
};
