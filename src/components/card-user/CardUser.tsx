import { User } from "@/types/user";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../ui/card";
import { cn } from "@/lib/utils";

export default function CardUser({
    user,
    className,
}: {
    user: User;
    className?: string;
}) {
    console.log(user);
    return (
        <Card className={cn(className)}>
            <CardHeader>
                <CardTitle>
                    {user.person.last_name} {user.person.first_name}{" "}
                    {user.person.patronymic}
                </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
                <div>{user.phone}</div>
                <div>Уровень: {user.rating_status}</div>
                <div>Рейтинг: {user.rating}</div>
                <div>Выполнено: {user.order_count}</div>
            </CardContent>
            <CardFooter></CardFooter>
        </Card>
    );
}
