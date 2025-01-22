/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { research } from "@/app/api";
import { HPChannel, HPVideo } from "@/app/components/hp-video";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SearchPage() {
    const { value } = useParams();
    const [results, setResults] = useState<any>();

    useEffect(() => {
        const fetchData = async () => {
            if (typeof value !== "string") return;
            const test = await research(value);
            setResults(test);
        };
        fetchData();
    }, [value]);

    

    return (
    
        <div className="flex flex-col gap-6 p-10">
            {results && results.items && results.items.map((item: any, index: number) => (
                <div
                key={index}
                className="flex h-[140px] gap-4 p-4 bg-white shadow rounded-lg items-center hover:shadow-md transition-shadow cursor-pointer"
                >
                {
                results.items[index].id.kind === "youtube#video" ? (
                    <HPVideo item={results.items[index]} />
                ) : (
                    <HPChannel item={results.items[index]} />
                )}
                </div>
            ))}
        </div>
      )
    }