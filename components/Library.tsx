'use client'
import useAuthModal from '@/hooks/useAuthModal'
import useUploadModal from '@/hooks/useUploadModal'
import { useUser } from '@/hooks/useUser'
import { Song } from '@/types'
import React from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { TbPlaylist } from 'react-icons/tb'
import MediaItem from './MediaItem'
import useOnPlay from '@/hooks/useOnPlay'
import useSubscribeModal from '@/hooks/useSubscriptionModal'

interface LibraryProp{
  songs: Song[]
}
const Library:React.FC<LibraryProp> = ({songs}) => {

    const {user, subscription} = useUser();
    const authModal = useAuthModal();
    const uploadModal = useUploadModal();
    const subscribeModal = useSubscribeModal()
    const onPlay = useOnPlay(songs)

    const onClick = () => {
        if(!user){
          return authModal.onOpen();
        }
        if(!subscription){
          return subscribeModal.onOpen()
        }
        return uploadModal.onOpen();
    }
  return (
    <div className='flex flex-col'>
      <div className='flex items-center justify-between px-5 pt-4'>
        <div className='inline-flex items-center gap-x-2'>
            <TbPlaylist className='text-neutral-400' size={26}/>
            <p className='text-neutral-400 font-medium text-md' >Your Library</p>
        </div>
        <AiOutlinePlus  className="text-neutral-400 cursor-pointer hover:text-white transition" onClick={onClick}/>
      </div>

      <div className='flex flex-col gap-y-4 mt-4 px-3'>
        {
          songs.map((song)=>(
            <MediaItem key={song.id} data={song} onClick={(id:string) => onPlay(id)}/>
          ))
        }
      </div>
    </div>
  )
}

export default Library
