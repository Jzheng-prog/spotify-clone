'use client'
import LikeButton from '@/components/LikeButton'
import MediaItem from '@/components/MediaItem'
import useOnPlay from '@/hooks/useOnPlay'
import { useUser } from '@/hooks/useUser'
import { Song } from '@/types'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

interface LikedContentProps{
    likedSongs: Song[]
}
const LikedContent: React.FC<LikedContentProps> = ({likedSongs}) => {

    const router =useRouter()
    const {isLoading, user} = useUser()
    const onPlay = useOnPlay(likedSongs)

    useEffect(()=>{
        if(!isLoading &&!user){
            router.push('/')
        }
    },[isLoading,user,router])

    if(likedSongs.length === 0){
        return (
            <div className='flex flex-col gap-y-2 w-full px-6 text-neutral-400'>
                No Liked Songs!
            </div>
        )
    }
  return (
    <div className='flex flex-col gap-y-2 w-full p-6'>
      {likedSongs.map((song)=>(
        <div key={song.id} className='flex items-center gap-x-4 w-full'>
            <div className='flex-1'>
                <MediaItem data={song} onClick={(id:string) => onPlay(id)}/>
            </div>
            <LikeButton songId={song.id}/>
        </div>
      ))}
    </div>
  )
}

export default LikedContent
