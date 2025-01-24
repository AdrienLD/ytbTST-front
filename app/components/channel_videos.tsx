/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React from 'react'
import { useParams, useRouter } from 'next/navigation'
import { fetchChannelVideo } from '@/app/api'
import Image from 'next/image';

const ChannelVideos: React.FC = () => {
    const { id } = useParams();
    const [ videosList, setVideosList ] = React.useState<any[]>([]);
    const router = useRouter();

    React.useEffect(() => {
        const fetchData = async () => {
            if (typeof id !== "string") return
            const data = await fetchChannelVideo(id)
            console.log(data)
            data.sort((a: any, b: any) => new Date(b.added_at).getTime() - new Date(a.added_at).getTime());
            setVideosList(data)
        };
        fetchData();
    }, [id]);

    const handleSearch = async (index: number) => {
        router.push(`/video/${index}`);
    }

    return (
        <div className="flex flex-col gap-6 p-10">
            {
                videosList.map((video, index) => (
                    <div
                key={index}
                className="flex h-[140px] gap-4 p-4 bg-white shadow rounded-lg items-center hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => handleSearch(video.video_id)}
                >
                    
                        <div className="w-48 h-full overflow-hidden rounded-md flex-shrink-0">
                            <Image
                                src={video.thumbnail_url}
                                alt="Thumbnail"
                                width={200}
                                height={120}
                                className="object-cover w-full h-full"
                            />
                        </div>
                        <div className="flex flex-col justify-center gap-2">
                            <h2 className="text-lg font-semibold text-gray-800">
                            {video.title}
                            </h2>
                            <p className="text-sm text-gray-600 line-clamp-2">
                            {video.channelTitle}
                            </p>
                        </div>

                    </div>
                ))
            }
            
        </div>
    );
};

export default ChannelVideos;