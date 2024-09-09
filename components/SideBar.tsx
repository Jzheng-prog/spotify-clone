"use client"
import { usePathname } from 'next/navigation'
import React, { useMemo } from 'react'
import { HiHome } from 'react-icons/hi'
import { BiSearch } from 'react-icons/bi'
import Box from './Box'
import SidebarItem from './SidebarItem'
import Library from './Library'


interface SideBarProps {
    children: React.ReactNode
}
const SideBar: React.FC<SideBarProps> = ({children}) => {

    const pathName = usePathname();
    const routes = useMemo(()=> [
        {
            icon:HiHome,
            label:'Home',
            active: pathName !== '/search',
            href: '/'
        },
        {            
            
            icon:BiSearch,
            label:'Home',
            active: pathName === '/search',
            href: '/search'
        }
    ],[pathName]);

  return (
    <div className='text-white flex h-full'>
      <div className='hidden md:flex flex-col gap-y-2 bg-black h-full p-2 w-[300px]'>
        <Box>
            <div className='flex flex-col  gap-y-4 py-4 px-5'>
                {routes.map((item)=>(
                    <SidebarItem key={item.label} {...item}/>
                ))}
            </div>
        </Box>
        <Box className='overflow-y-auto h-full'>
            <Library/>
        </Box>
      </div>
      <main className='h-full flex-1 overflow-y-auto py-2'>{children}</main>
    </div>
  )
}

export default SideBar
