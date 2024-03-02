import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DialogTrigger } from "@radix-ui/react-dialog";
import axios from "axios";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

export interface IToken {
    accessToken: string;
    refreshToken: string;
}

export function AuthDialog({
    token,
    setToken,
}: {
    token?: IToken | null;
    setToken: Dispatch<SetStateAction<IToken | null>>;
}) {
    const [user, setUser] = useState<{ phone: string; password: string }>({
        phone: "+79000000000",
        password: "string",
    });

    const [open, setOpen] = useState<boolean>(true);

    const refreshToken = localStorage.getItem("refreshToken");

    const handleOnClick = async () => {
        setUser({
            phone: "+79000000000",
            password: "string",
        });

        const res = await axios.post<IToken>(
            `${import.meta.env.VITE_API}/auth`,
            user
        );

        localStorage.setItem("accessToken", res.data.accessToken);
        localStorage.setItem("refreshToken", res.data.refreshToken);

        if (res.status === 201) {
            const token: IToken = {
                accessToken: res.data.accessToken,
                refreshToken: res.data.refreshToken,
            };
            setOpen(false);
            setToken(token);
        }
    };

    const refresh = async (refreshToken: string) => {
        const res = await axios.post<string>(
            `${import.meta.env.VITE_API}/auth/refresh`,
            { refresh_token: refreshToken }
        );

        localStorage.setItem("accessToken", res.data);

        if (res.status === 201) {
            setOpen(false);
        }
    };

    useEffect(() => {
        if (refreshToken !== null) {
            setOpen(false);
            refresh(refreshToken);
        }

        if (refreshToken === null) setOpen(true);
    }, []);

    const clearValues = async () => {
        if (!token) return;
        setToken(null);
        const res = await axios.delete(
            `http://master.adsscode.com/auth/logout`,
            { data: { refresh_token: refreshToken } }
        );

        if (res.status === 200) {
            setOpen(true);

            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen} defaultOpen={!token && true}>
            <DialogTrigger asChild>
                <Button onClick={clearValues}>
                    {token ? "Выйти" : "Войти"}
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Авторизация</DialogTitle>
                    <DialogDescription>
                        Чтобы получить рейтинг, нужно авторизоваться для
                        получения доступа
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="phone" className="text-right">
                            Телефон
                        </Label>
                        <Input
                            id="phone"
                            placeholder={user.phone}
                            onChange={(e) =>
                                setUser({
                                    ...user,
                                    phone: e.currentTarget.value,
                                })
                            }
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="password" className="text-right">
                            Пароль
                        </Label>
                        <Input
                            id="password"
                            placeholder={user.password}
                            type="password"
                            onChange={(e) =>
                                setUser({
                                    ...user,
                                    password: e.currentTarget.value,
                                })
                            }
                            className="col-span-3"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={handleOnClick} type="submit">
                        Войти
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
