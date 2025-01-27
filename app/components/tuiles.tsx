/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArchiveBoxIcon, DevicePhoneMobileIcon } from "@heroicons/react/16/solid";
import Image from "next/image"


export function VideoFromYtb({ item }: { item: any }) {
    return (
      <>
        <div className="w-48 h-full overflow-hidden rounded-md flex-shrink-0">
          <Image
            src={
              item.snippet.thumbnails.high.url ??
              item.snippet.thumbnails.default.url
            }
            alt="Thumbnail"
            width={200}
            height={120}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="flex flex-col justify-center gap-2">
          <h2 className="text-lg font-semibold text-gray-800">
            {item.snippet.title}
          </h2>
          <p className="text-sm text-gray-600 line-clamp-2">
            {item.snippet.channelTitle}
          </p>
        </div>
        { item.existsInDB ? (
            <ArchiveBoxIcon className="w-6 h-6 text-gray-500 mr-5 ml-auto" />
        ) : null }
      </>
    );
  }

export function ChannelFromYtb({ item }: { item: any }) {
  return (
    <>
      <div className="flex items-center w-48 h-full overflow-hidden rounded-md flex-shrink-0 relative">
        <Image
          src={
            item.snippet.thumbnails.high.url ??
            item.snippet.thumbnails.default.url
          }
          alt="Thumbnail"
          width={105}
          height={105}
          className="object-cover w-[105px] h-[105px] rounded-full m-auto"
        />
      </div>

      <div className="flex flex-col justify-center">
        <h2 className="text-xl font-semibold text-gray-800">
          {item.snippet.title}
        </h2>
        <p className="text-sm text-gray-600 line-clamp-2">
          {item.snippet.description}
        </p>
      </div>
      { item.existsInDB ? (
          <ArchiveBoxIcon className="w-6 h-6 text-gray-500 mr-5 ml-auto" />
      ) : null }
    </>
  )
}

export function VideoFromDB({ item }: { item: any }) {
    return (
      <div className="flex h-[140px] gap-4 p-4 bg-white shadow rounded-lg items-center hover:shadow-md transition-shadow cursor-pointer">
        <div className="w-48 h-full overflow-hidden rounded-md flex-shrink-0">
          <Image
            src={item.thumbnail_url}
            alt="Thumbnail"
            width={200}
            height={120}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="flex flex-col justify-center gap-2">
          <h2 className="text-lg font-semibold text-gray-800">
          {item.title}
          </h2>
          <p className="text-sm text-gray-600 line-clamp-2">
          {item.channelTitle}
          </p>
          <DevicePhoneMobileIcon className={`h-6 w-6 transition-transform ${
            item.is_short ? "rotate-0" : "rotate-90"
            }`} 
          />
        </div>
      </div>
    );
  }

export function ChannelFromDB({ item }: { item: any }) {
  return (
    <div className="flex w-auto h-[140px] gap-4 p-4 bg-white shadow rounded-lg items-center hover:shadow-md transition-shadow cursor-pointer  overflow-y-scroll">
      <div className="w-48 h-full overflow-hidden rounded-md flex-shrink-0">
        <Image
          src={item.thumbnail_url}
          alt="Thumbnail"
          width={105}
          height={105}
          className="object-cover w-[105px] h-[105px] rounded-full m-auto"
        />
      </div>
      <div className="flex flex-col justify-center gap-2">
        <h2 className="text-lg font-semibold text-gray-800">
          {item.name}
        </h2>
        <p className="text-sm text-gray-600 line-clamp-2">
          {item.description}
        </p>
      </div>
    </div>
  )
}