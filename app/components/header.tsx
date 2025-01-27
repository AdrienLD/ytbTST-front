/* eslint-disable @typescript-eslint/no-explicit-any */
"use client" 
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import Image from 'next/image';
import { UserIcon } from "@heroicons/react/16/solid";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from 'next/navigation';


export default function Header() {
    const [value, setValue] = useState("");
    const router = useRouter();

    const handleSearch = async () => {
        if (value !== "") router.push(`/search/${encodeURIComponent(value)}`);
    }

    const handleHomepage = async () => {
        router.push(`/`);
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    }

    return (
        <div className="flex gap-10 p-7 items-center bg-slate-100 shadow-md sticky top-0 z-10">
            <Image src="/logo.png" alt="Logo" className="cursor-pointer" width={100} height={100} onClick={handleHomepage}/>

            <Input 
                placeholder="Recherche" 
                value={value} 
                onChange={(e) => setValue(e.target.value)} 
                onKeyDown={handleKeyDown}
            />
            <Button onClick={handleSearch}>Rechercher</Button>
            <Avatar>
                <AvatarFallback>
                    <UserIcon className="text-gray-500" />
                </AvatarFallback>
            </Avatar>
        </div>
    )
}
