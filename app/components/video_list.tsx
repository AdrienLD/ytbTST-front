/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { fetchLastVideos } from '../api'
import { VideoFromDB } from './tuiles'
import { useRouter } from 'next/navigation'

const VideoList = () => {
    const router = useRouter();
    const [ videoList, setvideoList ] = React.useState<any[]>([]);
    
    React.useEffect(() => {
        const fetchData = async () => {
            const data = await fetchLastVideos()
            console.log(data)
            setvideoList(data)
        }
        fetchData()
    }, [])

    const handlevideo = (videoId: string) => {
        router.push(`/video/${videoId}`)
    }

    return (
        <div className='w-[80%] h-auto overflow-y-auto'>
            <h1 className="text-2xl font-semibold text-gray-800 mb-4  text-center">Dernières vidéos ajoutées</h1>

            {
                videoList && videoList.map((video, index) => (
                    <div key={index} onClick={() => handlevideo(video.video_id)}
                    className='p-1'>
                        
                        <VideoFromDB item={video} />
                    </div>
                ))
            }
        </div>
    )
}

export default VideoList