"use client"
import { usePathname } from 'next/navigation'
import React, { useMemo } from 'react'
import { HiHome } from 'react-icons/hi'
import { BiSearch } from 'react-icons/bi'
import Box from './Box'
import SidebarItem from './SidebarItem'
import Library from './Library'
import { Song } from '@/types'
import usePlayer from '@/hooks/usePlayer'
import { twMerge } from 'tailwind-merge'


interface SideBarProps {
    children: React.ReactNode;
    songs:Song[]
}
const SideBar: React.FC<SideBarProps> = ({children, songs}) => {

    const pathName = usePathname();
    const player =usePlayer()
    const routes = useMemo(()=> [
        {
            icon:HiHome,
            label:'Home',
            active: pathName !== '/search',
            href: '/'
        },
        {            
            
            icon:BiSearch,
            label:'Search',
            active: pathName === '/search',
            href: '/search'
        }
    ],[pathName]);

  return (
    <div className={twMerge(`flex h-full text-white`, player.activeId && "h-[calc(100%-80px)]")}>
      <div className='hidden md:flex flex-col gap-y-2 bg-black h-full p-2 w-[300px]'>
        <Box>
            <div className='flex flex-col gap-y-4 py-4 px-5'>
                {routes.map((item)=>(
                    <SidebarItem key={item.label} {...item}/>
                ))}
            </div>
        </Box>
        <Box className='overflow-y-auto h-full'>
            <Library songs={songs}/>
        </Box>
      </div>
      <main className='h-full flex-1 overflow-y-auto py-2'>{children}</main>
    </div>
  )
}

export default SideBar
