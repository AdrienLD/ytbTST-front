
"use client"

import ChannelList from "./components/channel_list";
import VideoList from "./components/video_list";

export default function Home() {
  return (
      <div className="flex gap-5 w-full px-10 py-5"> 
        <ChannelList />
        <VideoList />
      </div>
  )
}
