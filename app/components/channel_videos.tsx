/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React from 'react'
import { useParams, useRouter } from 'next/navigation'
import { fetchChannelVideo } from '@/app/api'
import { VideoFromDB } from './tuiles';

const ChannelVideos: React.FC = () => {
    const { id } = useParams();
    const [ videosList, setVideosList ] = React.useState<any[]>([]);
    const router = useRouter();

    React.useEffect(() => {
        const fetchData = async () => {
            if (typeof id !== "string") return
            const data = await fetchChannelVideo(id)
            if (data)data.sort((a: any, b: any) => new Date(b.added_at).getTime() - new Date(a.added_at).getTime());
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
                videosList && videosList.map((video, index) => (
                    <div
                        key={index}
                        onClick={() => handleSearch(video.video_id)}
                    >
                        <VideoFromDB item={video} />
                    </div>
                ))
            }
            
        </div>
    );
};

export default ChannelVideos;