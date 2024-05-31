import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
    ADMIN_STUD_LIST_LINK,
    ADMIN_TEACH_LIST_LINK,
} from "@/data/types/constants";
import { ChevronsRight } from "lucide-react";
import { Link } from "react-router-dom";

export const AdminTeachersListCard = () => {
    return (
        <Card className="h-min">
            <CardHeader>
                <CardTitle>Список преподавателей</CardTitle>
            </CardHeader>
            <CardFooter>
                <Link to={ADMIN_TEACH_LIST_LINK}>
                    <Button variant={"outline"} className="text-lg" size={"lg"}>
                        Перейти {<ChevronsRight className="ml-3" />}
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    );
};

export const AdminStudentsListCard = () => {
    return (
        <Card className="h-min">
            <CardHeader>
                <CardTitle>Список студентов</CardTitle>
            </CardHeader>
            <CardFooter>
                <Link to={ADMIN_STUD_LIST_LINK}>
                    <Button variant={"outline"} className="text-lg" size={"lg"}>
                        Перейти {<ChevronsRight className="ml-3" />}
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    );
};
