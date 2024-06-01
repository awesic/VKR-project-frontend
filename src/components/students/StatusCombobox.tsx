import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { FC, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { TIdLabelFields } from "@/data/types/UsersTypes";
import { getStatusIcon } from "@/data/helpers";
import { useFetchStatuses } from "@/features/queries";

type statusWithIcon = TIdLabelFields & { icon: LucideIcon };

interface Props {
    status: TIdLabelFields;
    onStatusSelect: (status: string) => void;
    disabled: boolean;
}

export const StatusCombobox: FC<Props> = ({
    status,
    onStatusSelect,
    disabled,
}) => {
    const [open, setOpen] = useState(false);
    const { data: statusList } = useFetchStatuses();
    const [selectedStatus, setSelectedStatus] = useState<statusWithIcon | null>(
        {
            id: status.id,
            label: status.label,
            icon: getStatusIcon(status.id),
        }
    );
    const [statusesWithIcon, setStatusesWithIcon] = useState<
        statusWithIcon[] | null
    >(null);

    useEffect(() => {
        const mapStatusesAndIcons = async () => {
            if (statusList) {
                setStatusesWithIcon(
                    statusList.map((status) => ({
                        ...status,
                        icon: getStatusIcon(status.id),
                    }))
                );
            }
        };
        mapStatusesAndIcons();
    }, [statusList]);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild className="flex justify-start w-auto">
                <Button
                    disabled={disabled}
                    variant="outline"
                    className="text-wrap border-2">
                    {selectedStatus ? (
                        <>
                            <selectedStatus.icon className="mr-2 h-4 w-4 shrink-0" />
                            {selectedStatus.label}
                        </>
                    ) : (
                        <>+ Set status</>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0" align="start">
                <Command>
                    <CommandInput placeholder="Поменять статус..." />
                    <CommandList>
                        <CommandEmpty>Ничего не найдено.</CommandEmpty>
                        <CommandGroup>
                            {statusesWithIcon?.map((status) => (
                                <CommandItem
                                    key={status.label}
                                    value={status.id}
                                    onSelect={(id) => {
                                        setSelectedStatus(
                                            statusesWithIcon.find(
                                                (priority) => priority.id === id
                                            ) || null
                                        );
                                        onStatusSelect(id);
                                        setOpen(false);
                                    }}>
                                    <status.icon
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            status.id === selectedStatus?.id
                                                ? "opacity-100"
                                                : "opacity-40"
                                        )}
                                    />
                                    <span>{status.label}</span>
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
};
