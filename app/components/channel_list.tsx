/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { fetchLastChannels } from '../api'
import { ChannelFromDB } from './tuiles'
import { useRouter } from 'next/navigation'

const ChannelList = () => {
    const router = useRouter();
    const [ channelList, setChannelList ] = React.useState<any[]>([]);
    
    React.useEffect(() => {
        const fetchData = async () => {
            const data = await fetchLastChannels()
            console.log(data)
            setChannelList(data)
        }
        fetchData()
    }, [])

    const handleChannel = (channelId: string) => {
        router.push(`/channel/${channelId}`)
    }

    return (
        <div className='w-[80%] h-auto overflow-y-auto'>
            <h1 className="text-2xl font-semibold text-gray-800 mb-4  text-center">Dernières chaines ajoutées</h1>

            {
                channelList && channelList.map((channel, index) => (
                    <div key={index} onClick={() => handleChannel(channel.channel_id)}
                        className='p-1'>
                        
                        <ChannelFromDB item={channel} />
                    </div>
                ))
            }
        </div>
    )
}

export default ChannelList