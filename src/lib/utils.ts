import { type ClassValue, clsx } from "clsx";

import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatInitials = (
  firstName: string,
  lastName: string,
  patronymic: string
) => {
  const str = `${lastName} ${firstName} ${patronymic}`;

  return str
    .split(/\s+/)
    .map((w, i) => (i ? w.substring(0, 1).toUpperCase() + "." : w))
    .join(" ");
};

export const getCookieValue = (key: string) => {
  const cookieValue = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${key}=`))
    ?.split("=")[1];

  return cookieValue;
};

export const removeCookieValue = (key: string) => {
  document.cookie = `${key}=; Max-Age=-1`;
};
