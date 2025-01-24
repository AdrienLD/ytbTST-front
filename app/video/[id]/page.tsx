/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React from 'react';
import { useParams } from 'next/navigation';
import { fetchVideoInfo } from '@/app/api';
import Image from 'next/image';
import { DevicePhoneMobileIcon } from '@heroicons/react/16/solid';
import VideoStats from '@/app/components/video_stats';

const VideoPage: React.FC = () => {
    const { id } = useParams();
    const [ VideoInfo, setVideoInfo ] = React.useState<any>();
    const [showFullDescription, setShowFullDescription] = React.useState(false)

    React.useEffect(() => {
        const fetchData = async () => {
            if (typeof id !== "string") return;
            const data = await fetchVideoInfo(id);
            console.log(data);
            setVideoInfo(data);
        };
        fetchData();
    }, [id]);

    return (
        <div className="p-6 bg-gray-50 rounded-lg ">
            {VideoInfo && (
                <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="flex-shrink-0 w-52">
                        <Image
                        src={VideoInfo.thumbnail_url}
                        alt={`${VideoInfo.name} Thumbnail`}
                        width={150}
                        height={150}
                        className="rounded-md shadow-lg m-auto"
                        />
                    </div>
                    <div className="flex-grow">
                    <h1 className="text-2xl font-bold text-gray-800">{VideoInfo.title}</h1>
                    <p className="text-sm text-gray-600 mt-2">
                        <strong>Description :</strong>{" "}
                        {showFullDescription
                            ? VideoInfo.description
                            : VideoInfo.description.slice(0, 100) + (VideoInfo.description.length > 100 ? "... " : "")}
                        {VideoInfo.description.length > 100 && (
                            <button
                            onClick={() => setShowFullDescription(!showFullDescription)}
                            className="text-blue-500 hover:underline"
                            >
                            {showFullDescription ? "moins" : "plus"}
                            </button>
                        )}
                    </p>
                    <p className="text-sm text-gray-600">
                        <strong>Publiée le :</strong>{" "}
                        {new Date(VideoInfo.published_at).toLocaleDateString("fr-FR", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                        })}
                    </p>
                    <p>
                        <DevicePhoneMobileIcon className={`h-6 w-6 transition-transform ${
                            VideoInfo.is_short ? "rotate-90" : "rotate-0"
                            }`} 
                        />
                    </p>
                    </div>
                </div>
            )}
            <VideoStats />
        </div>
    );
};

export default VideoPage;