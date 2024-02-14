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

interface Props {
    open: boolean;
    setOpen: (open: boolean) => void;
    deleteUser: () => void;
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
