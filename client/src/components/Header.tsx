import React, { useState, useMemo, useCallback } from "react";
import { debounce } from "lodash";
import { ArrowRight, Search, User } from "lucide-react";
import { Input } from "./ui/input";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import LogoutButton from "./LogoutButton";
import { Link, useNavigate } from "react-router-dom";
import { Member } from "@/types/departments";
import MemberService from "@/services/member-service";
import useUserStore from "@/store/user-store";
import { ModeToggle } from "./mode-toggle";

export const Header: React.FC = () => {
    const { user } = useUserStore();
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<Member[]>([]);
    const navigate = useNavigate();

    const debouncedSearch = useMemo(
        () =>
            debounce(async (value: string) => {
                const { data } = await MemberService.getMemberByDetails(value);
                setResults(data || []);
            }, 500),
        []
    );

    const handleInputChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const value = event.target.value;
            setQuery(value);
            debouncedSearch(value);
        },
        [debouncedSearch]
    );

    React.useEffect(() => {
        return () => {
            debouncedSearch.cancel();
        };
    }, [debouncedSearch]);

    return (
        <header className="h-[100px] bg-destructive-foreground flex items-center justify-between px-[50px] gap-5 border-b border-foreground-muted relative">
            <Link to="/">
                <h1 className="text- cursor-pointer text-foreground ">.find</h1>
            </Link>

            <div className="relative flex items-center bg-[rgb(242,243,247)] max-w-[600px] w-[600px] rounded-md z-20">
                <Search className="ml-2 absolute left-2 text-gray-400 h-5 w-5 " />
                <Input
                    className="pl-12 pr-2 py-1 w-full bg-accent-foreground text-foreground rounded-md "
                    placeholder="Начните поиск сотрудника..."
                    value={query}
                    onChange={handleInputChange}
                />
                {results.length > 0 && query.trim() !== "" && (
                    <ul className="absolute left-0 right-0 top-10 mt-2 bg-card border border-gray-300 rounded-md shadow-md max-h-60 overflow-y-auto z-20">
                        {results.map((item, index) => (
                            <li
                                onClick={() => {
                                    setQuery("");
                                    setResults([]);
                                    navigate(`member/${item.id}`);
                                }}
                                key={index}
                                className="px-4 py-2 hover:bg-accent cursor-pointer text-foreground flex justify-between"
                            >
                                {item.fullname} | {item.role}
                                <div className="flex gap-3 items-center text-foreground">
                                    <span className=" ml-2 items-center ">
                                        Нажмите, чтобы узнать больше{" "}
                                    </span>
                                    <ArrowRight size={15} className=" mt-1" />
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <ModeToggle />

            <DropdownMenu>
                <DropdownMenuTrigger>
                    <div className="text-[rgb(151,160,168)] border-[rgb(151,160,168)] cursor-pointer border-[2px] rounded-full p-2">
                        <User className="w-6 h-6" />
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem
                        onClick={() => navigate(`/member/${user?.id}`)}
                    >
                        Мой аккаунт
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <LogoutButton />
                </DropdownMenuContent>
            </DropdownMenu>

            {results.length > 0 && query.trim() !== "" && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-10"></div>
            )}
        </header>
    );
};
