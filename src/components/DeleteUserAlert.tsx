import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";

interface Props {
    open: boolean;
    setOpen: (open: boolean) => void;
    deleteUser: () => void;
}
interface ChangeThemeProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    theme?: string;
    isLoading: boolean;
    handleSubmit: () => void;
    handleChange: (value?: string) => void;
}

export const DeleteUserAlert = ({ open, setOpen, deleteUser }: Props) => {
    return (
        <AlertDialog open={open} onOpenChange={() => setOpen(!open)}>
            <AlertDialogContent>
                <AlertDialogHeader className="text-left">
                    <AlertDialogTitle>Вы абсолютно уверены?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Это действие невозможно отменить. Это приведет к
                        необратимому удалению учетной записи и данных с
                        серверов.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Отмена</AlertDialogCancel>
                    <AlertDialogAction onClick={() => deleteUser()}>
                        Удалить
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export const ChangeStudentThemeDialog = ({
    open,
    setOpen,
    theme,
    isLoading,
    handleChange,
    handleSubmit,
}: ChangeThemeProps) => {
    return (
        <Dialog open={open} onOpenChange={() => setOpen(!open)}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Изменить тему</DialogTitle>
                </DialogHeader>
                <div className="py-4 items-center">
                    <Textarea
                        autoFocus
                        name="theme"
                        placeholder={theme ? theme : "Введите тему..."}
                        defaultValue={theme}
                        className="col-span-3"
                        onChange={(e) => handleChange(e.target.value)}
                    />
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button
                            type="button"
                            disabled={isLoading}
                            onClick={handleSubmit}>
                            {isLoading ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : null}
                            Сохранить
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
