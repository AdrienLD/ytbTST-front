/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArchiveBoxIcon } from "@heroicons/react/16/solid";
import Image from "next/image"


export function HPVideo({ item }: { item: any }) {
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

export function HPChannel({ item }: { item: any }) {
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
    );
  }