/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { addChannel, research } from "@/app/api"
import { ChannelFromYtb, VideoFromYtb } from "@/app/components/tuiles"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
    import { useRouter } from 'next/navigation'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export default function SearchPage() {
    const { value } = useParams()
    const [results, setResults] = useState<any>()
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [dialogContent, setDialogContent] = useState<any>(null);
    const router = useRouter()

    const fetchData = async () => {
        if (typeof value !== "string") return
        const test = await research(value)
        setResults(test)
    }

    useEffect(() => {
        fetchData()
    }, [value])


    const handleSearch = async (index: number) => {
        if (!results.items[index].existsInDB) {
            subscribe(results.items[index])
            return
        }
        if (results.items[index].id.kind === "youtube#video") {
            router.push(`/video/${results.items[index].id.videoId}`)
        } else router.push(`/channel/${results.items[index].snippet.channelId}`)
    }

    const subscribe = async (index: any) => {
        if (index.id.kind === "youtube#channel") {
            setDialogContent(index)
            setIsDialogOpen(true)
        }
    }

    const handleAddChannel = async (channelId: string) => {
        await addChannel(channelId)
        setIsDialogOpen(false)

        fetchData()
    }

    return (
    
        <div className="flex flex-col gap-6 p-10">
            {results && results.items && results.items.map((item: any, index: number) => (
                <div
                key={index}
                className="flex h-[140px] gap-4 p-4 bg-white shadow rounded-lg items-center hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => handleSearch(index)}
                >
                {
                results.items[index].id.kind === "youtube#video" ? (
                    <VideoFromYtb item={results.items[index]} />
                ) : (
                    <ChannelFromYtb item={results.items[index]} />
                )}
                </div>
            ))}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                <DialogHeader>
                    {dialogContent && (
                <>
                    <DialogTitle>
                    Voulez-vous vraiment suivre la chaîne :{" "}
                    <span className="font-bold">
                        {dialogContent.snippet.title}
                    </span>
                    ?
                    </DialogTitle>
                    <DialogDescription>
                    <Button
                        onClick={() =>handleAddChannel(dialogContent.snippet.channelId)}
                    >
                        Suivre
                    </Button>
                    </DialogDescription>
                </>
                )}
                </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}