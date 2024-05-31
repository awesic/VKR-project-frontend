import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    TEACHER_CHOOSE_STUD_LINK,
    TEACHER_STUD_LIST_LINK,
} from "@/data/types/constants";
import { ChevronsRight } from "lucide-react";
import { Link } from "react-router-dom";

export const StudentsCard = () => {
    return (
        <Card className="h-min">
            <CardHeader>
                <CardTitle>Выбрать студентов</CardTitle>
            </CardHeader>
            <CardContent className="text-neutral-600">
                Список студентов, которые выбрали Вас научным руководителем
            </CardContent>
            <CardFooter>
                <Link to={TEACHER_CHOOSE_STUD_LINK}>
                    <Button variant={"outline"} className="text-lg" size={"lg"}>
                        Перейти {<ChevronsRight className="ml-3" />}
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    );
};

export const StudentsListCard = () => {
    return (
        <Card className="h-min">
            <CardHeader>
                <CardTitle>Список студентов</CardTitle>
            </CardHeader>
            <CardContent className="text-neutral-600">
                Список студентов, которых Вы выбрали
            </CardContent>
            <CardFooter>
                <Link to={TEACHER_STUD_LIST_LINK}>
                    <Button variant={"outline"} className="text-lg" size={"lg"}>
                        Перейти {<ChevronsRight className="ml-3" />}
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    );
};
