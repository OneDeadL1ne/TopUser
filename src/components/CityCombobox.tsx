"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { IToken } from "./AuthDialog";
import axios from "axios";

export interface ICity {
    city_id: number;
    city_name: string;
    createdAt: string;
    updatedAt: string;
}

export function CityCombobox({
    getUser,
    token,
}: {
    getUser: (idCity: string) => Promise<void>;
    token?: IToken | null;
}) {
    const [open, setOpen] = React.useState(false);

    const [cities, setCities] = React.useState<ICity[]>([]);
    const [value, setValue] = React.useState("");
    const config = {
        headers: { Authorization: `Bearer ${token?.accessToken}` },
    };

    const getCity = async () => {
        axios
            .get<ICity[]>(`${import.meta.env.VITE_API}/city/all`, config)
            .then((res) => {
                setCities(res.data);
            });
    };

    React.useEffect(() => {
        getCity();
    }, []);

    React.useEffect(() => {
        setValue("");
    }, [token]);

    React.useEffect(() => {
        getUser(value);
    }, [value]);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="justify-between outline outline-gray-400 outline-1 rounded-xl shadow-md mb-5  text-gray-500"
                >
                    {value
                        ? cities.find(
                              (city) => city.city_id.toString() === value
                          )?.city_name
                        : "Выберите город"}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandGroup>
                        {cities.map((city) => (
                            <CommandItem
                                key={city.city_id}
                                value={city.city_id.toString()}
                                onSelect={(currentValue) => {
                                    setValue(
                                        currentValue === value
                                            ? ""
                                            : currentValue
                                    );
                                    setOpen(false);
                                }}
                            >
                                <Check
                                    className={cn(
                                        "mr-2 h-4 w-4",
                                        value === city.city_id.toString()
                                            ? "opacity-100"
                                            : "opacity-0"
                                    )}
                                />
                                {city.city_name}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
