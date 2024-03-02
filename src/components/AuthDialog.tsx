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
import { getCookieValue, removeCookieValue } from "@/lib/utils";
import { DialogTrigger } from "@radix-ui/react-dialog";
import axios from "axios";
import { useState } from "react";

export interface IToken {
  accessToken: string;
  refreshToken: string;
}

export function AuthDialog() {
  const [user, setUser] = useState<{ phone: string; password: string }>({
    phone: "+79000000000",
    password: "string",
  });

  const accessToken = getCookieValue("access_token");
  const refreshToken = getCookieValue("refresh_token");
  const [open, setOpen] = useState<boolean>(!accessToken && !refreshToken);
  //   const [cookies, setCookie, removeCookie] = useCookies([
  //     "access_token",
  //     "refresh_token",
  //   ]);

  const expires = new Date();
  expires.setTime(expires.getTime() + 12 * 60);

  const handleOnClick = async () => {
    const res = await axios.post<IToken>(
      `${import.meta.env.VITE_API}/auth`,
      user
    );

    if (res.status === 201) {
      document.cookie = `access_token=${res.data.accessToken}; Max-Age=86400`;
      document.cookie = `refresh_token=${res.data.refreshToken}; Max-Age=86400`;
      //   setCookie("access_token", res.data.accessToken, {
      //     expires,
      //   });
      //   setCookie("refresh_token", res.data.refreshToken, {
      //     expires,
      //   });
      setOpen(false);
    }
  };

  const clearValues = async () => {
    if (!accessToken) return;
    const res = await axios.delete(`${import.meta.env.VITE_API}/auth/logout`, {
      data: { refresh_token: refreshToken },
    });

    if (res.status === 200) {
      setOpen(true);

      removeCookieValue("access_token");
      removeCookieValue("refresh_token");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={clearValues}>{accessToken ? "Выйти" : "Войти"}</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Авторизация</DialogTitle>
          <DialogDescription>
            Чтобы получить рейтинг, нужно авторизоваться для получения доступа
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
