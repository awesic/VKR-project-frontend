import { FC, useState } from "react";
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
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";
import { useFetchAllTeachers } from "@/features/queries";

interface Props {
    preferTeacher: number | undefined;
    setPreferTeacher: (teacherId: number | undefined) => void;
}

export const TeachersSelect: FC<Props> = ({
    preferTeacher,
    setPreferTeacher,
}) => {
    const [open, setOpen] = useState(false);
    const { data: teachers, isLoading } = useFetchAllTeachers();

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    className={cn(
                        "min-w-min justify-between",
                        !preferTeacher && "text-muted-foreground"
                    )}>
                    {preferTeacher
                        ? teachers?.find(
                              (teacher) => teacher.id === preferTeacher
                          )?.fio
                        : "Выберите преподавателя..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="min-w-[16rem] p-0">
                <Command>
                    <CommandInput placeholder="Поиск..." />
                    <CommandEmpty>Ничего не найдено.</CommandEmpty>
                    {isLoading ? (
                        <div className="inline-flex items-center justify-center w-full my-3">
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            <span>Загрузка</span>
                        </div>
                    ) : (
                        <>
                            <CommandGroup>
                                {teachers?.map((teacher) => (
                                    <CommandItem
                                        value={teacher.fio}
                                        key={teacher.id}
                                        onSelect={() => {
                                            setPreferTeacher(teacher.id);
                                            setOpen(false);
                                        }}>
                                        <Check
                                            className={cn(
                                                "mr-2 h-4 w-4",
                                                teacher.id === preferTeacher
                                                    ? "opacity-100"
                                                    : "opacity-0"
                                            )}
                                        />
                                        {teacher.fio}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </>
                    )}
                </Command>
            </PopoverContent>
        </Popover>
    );
};
