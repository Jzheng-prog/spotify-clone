'use client'
import useAuthModal from '@/hooks/useAuthModal'
import useUploadModal from '@/hooks/useUploadModal'
import { useUser } from '@/hooks/useUser'
import { Song } from '@/types'
import React from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { TbPlaylist } from 'react-icons/tb'
import MediaItem from './MediaItem'

interface LibraryProp{
  songs: Song[]
}
const Library:React.FC<LibraryProp> = ({songs}) => {

    const {user} = useUser();
    const authModal = useAuthModal();
    const uploadModal = useUploadModal();

    const onClick = () => {
        if(!user){
          return authModal.onOpen();
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
            <div>
              <MediaItem data={song}/>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Library
