"use client"

import useLoadImage from "@/hooks/useLoadImage";
import { Song } from "@/types";
import Image from "next/image";

interface MediaItemProps{
    data: Song;
    onClick?: (id:string) => void;
}
const MediaItem:React.FC<MediaItemProps> = ({data, onClick}) => {

    const imageUrl = useLoadImage(data);
    const handleClick = () => {
        if(onClick){
            return onClick(data.id)
        }
    }
  return (
    <div className="flex items-center gap-x-3 w-full p-2 rounded-md hover:bg-neutral-800/50" onClick={handleClick}>
      <div className="min-h-[48px] min-w-[48px] overflow-hidden relative">
        <Image src={imageUrl || '/image/liked.png'} alt="image" fill className="object-fill"/>
      </div>
      <div className="flex flex-col gap-y-1 overflow-hidden">
        <p className="text-white truncate">{data.title}</p>
        <p className="text-neutral-400 text-sm truncate">{data.author}</p>

      </div>
    </div>
  )
}

export default MediaItem
