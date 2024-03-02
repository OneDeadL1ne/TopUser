import axios from "axios";
import { User } from "./types/user";
import { useEffect, useState } from "react";
import { CircleUser } from "lucide-react";
import "@smastrom/react-rating/style.css";
import { Rating } from "@smastrom/react-rating";
import { ScrollArea, ScrollBar } from "./components/ui/scroll-area";
import { AuthDialog, IToken } from "./components/AuthDialog";
import { CityCombobox } from "./components/CityCombobox";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";

export default function App() {
    const [token, setToken] = useState<IToken | null>(null);
    const [users, setUsers] = useState<User[]>([]);

    const config = {
        headers: { Authorization: `Bearer ${token?.accessToken}` },
    };

    const getUsers = async (idCity: string) => {
        axios
            .get<User[]>(
                `${import.meta.env.VITE_API}/user-rating/all/${idCity}`,
                config
            )
            .then((res) => {
                setUsers(res.data);
            });
    };

    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");
        const refreshToken = localStorage.getItem("refreshToken");
        if (accessToken && refreshToken) {
            setToken({
                accessToken: accessToken,
                refreshToken: refreshToken,
            });
        }
    }, []);

    useEffect(() => {
        setUsers([]);
    }, [token]);

    const medal = new Map<number, React.ReactNode>();
    medal.set(0, <img src="/gold.png" className="h-[32px] ml-5" />);
    medal.set(1, <img src="/silver.png" className="h-[32px] ml-5" />);
    medal.set(2, <img src="/bronze.png" className="h-[32px] ml-5" />);

    return (
        <div className="m-3 p-1">
            <div className="w-full flow-root">
                <div className="float-start">
                    <CityCombobox getUser={getUsers} token={token} />
                </div>
                <div className="float-end">
                    <AuthDialog setToken={setToken} token={token} />
                </div>
            </div>

            <div className="grid grid-cols-5 outline outline-gray-400 text-2xl text-gray-500 outline-1 rounded-xl shadow-md mb-5 pt-2 pb-2 ">
                <div className="flex items-center justify-center ">ФИО</div>

                <div className="flex justify-center  text-wrap ">
                    СРЕДНЯЯ ОЦЕНКА
                </div>
                <div className="flex justify-center ">СТАТУС</div>
                <div className="flex justify-center ">КОЛ-ВО ЗАКАЗОВ</div>
                <div className="flex justify-center ">РЕЙТИНГ</div>
            </div>

            <div className="h-full w-full overflow-hidden  overflow-y-auto">
                <ScrollArea className="min-h-full">
                    {users.length !== 0 ? (
                        users.map((user, key) => (
                            <>
                                <div
                                    key={key}
                                    className="grid grid-cols-5 mb-4 shadow-md outline outline-gray-400 outline-1 rounded-xl pb-6 pt-6 m-1"
                                >
                                    <div className="flex items-center justify-start  text-lg linear-gradient">
                                        <div className="flex items-center justify-start gap-2">
                                            {medal.get(key) !== undefined ? (
                                                <>
                                                    {medal.get(key)}
                                                    <Avatar>
                                                        <AvatarImage
                                                            className="h-[50px]"
                                                            src={`${
                                                                import.meta.env
                                                                    .VITE_API
                                                            }/file/uploads?path=uploads/users/${
                                                                user.user_uuid
                                                            }.jpg`}
                                                        />
                                                        <AvatarFallback>
                                                            <CircleUser className="" />
                                                        </AvatarFallback>
                                                    </Avatar>
                                                </>
                                            ) : (
                                                <>
                                                    <p className="h-[32px] ml-[30px]">
                                                        {key + 1}
                                                    </p>
                                                    <Avatar>
                                                        <AvatarImage
                                                            className="h-[50px]"
                                                            src={`${
                                                                import.meta.env
                                                                    .VITE_API
                                                            }/file/uploads?path=uploads/users/${
                                                                user.user_uuid
                                                            }.jpg`}
                                                        />
                                                        <AvatarFallback>
                                                            <CircleUser className="ml-[10px] mr-[10px]" />
                                                        </AvatarFallback>
                                                    </Avatar>
                                                </>
                                            )}

                                            <div className="text-xl text-wrap ">{`${user.person.last_name} ${user.person.first_name}`}</div>
                                        </div>
                                    </div>
                                    <div className="flex  justify-center items-center gap-1 text-2xl linear-gradient ">
                                        <Rating
                                            className=""
                                            style={{ maxWidth: 150 }}
                                            value={user.avg_evaluation}
                                            readOnly
                                        />
                                        {user.avg_evaluation}
                                    </div>
                                    <div className=" flex items-center justify-center text-2xl linear-gradient">
                                        {user.rating_status}
                                    </div>
                                    <div className=" flex items-center justify-center text-2xl linear-gradient">
                                        {user.order_count}
                                    </div>
                                    <div className=" items-center outline-1 flex justify-center text-2xl">
                                        {user.rating}
                                    </div>
                                </div>
                            </>
                        ))
                    ) : (
                        <></>
                    )}
                    <ScrollBar orientation="vertical" />
                </ScrollArea>
            </div>
        </div>
    );
}
