/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React from 'react';
import { useParams } from 'next/navigation';
import { fetchChannelInfo } from '@/app/api';
import Image from 'next/image';
import ChannelStats from '@/app/components/channel_stats';

const ChannelPage: React.FC = () => {
    const { id } = useParams();
    const [ channelInfo, setChannelInfo ] = React.useState<any>();
    const [showFullDescription, setShowFullDescription] = React.useState(false);

    React.useEffect(() => {
        const fetchData = async () => {
            if (typeof id !== "string") return;
            const data = await fetchChannelInfo(id);
            console.log(data);
            setChannelInfo(data);
        };
        fetchData();
    }, [id]);

    return (
        <div className="p-6 bg-gray-50 rounded-lg ">
            {channelInfo && (
                <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="flex-shrink-0 w-52">
                    <Image
                    src={channelInfo.thumbnail_url}
                    alt={`${channelInfo.name} Thumbnail`}
                    width={150}
                    height={150}
                    className="rounded-full shadow-lg m-auto"
                    />
                </div>

                <div className="flex-grow">
                    <h1 className="text-2xl font-bold text-gray-800">{channelInfo.name}</h1>
                    <p className="text-sm text-gray-600 mt-2">
                        <strong>Description :</strong>{" "}
                        {showFullDescription
                            ? channelInfo.description
                            : channelInfo.description.slice(0, 100) + (channelInfo.description.length > 100 ? "... " : "")}
                        {channelInfo.description.length > 100 && (
                            <button
                            onClick={() => setShowFullDescription(!showFullDescription)}
                            className="text-blue-500 hover:underline"
                            >
                            {showFullDescription ? "moins" : "plus"}
                            </button>
                        )}
                    </p>
                    <div className="mt-4 text-sm text-gray-500">
                    <p>
                        <strong>Custom URL :</strong>{" "}
                        <a
                        href={`https://www.youtube.com/${channelInfo.custom_url}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                        >
                        {channelInfo.custom_url}
                        </a>
                    </p>
                    <p>
                        <strong>Pays :</strong> {channelInfo.country}
                    </p>
                    <p>
                        <strong>Créé le :</strong>{" "}
                        {new Date(channelInfo.created_at).toLocaleDateString("fr-FR", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        })}
                    </p>
                    <p>
                        <strong>Ajouté le :</strong>{" "}
                        {new Date(channelInfo.added_at).toLocaleDateString("fr-FR", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        })}
                    </p>
                    </div>
                </div>
                </div>
            )}
            <ChannelStats />
        </div>

    );
};

export default ChannelPage;