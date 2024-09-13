import getLikedSongs from "@/actions/getLikedSongs"
import Header from "@/components/Header"
import Image from "next/image"
import LikedContent from "./components/LikedContent"

const Liked = async () => {

    const likedSongs = await getLikedSongs()
  return (
    <div className="rounded-lg h-full w-full bg-neutral-900 overflow-y-auto overflow-hidden">
      <Header>
        <div className="mt-20">
            <div className="flex flex-col md:flex-row items-center gap-x-5">
                <div className="relative h-32 w-32 lg:h-44 lg:w-44">
                    <Image src='/images/liked.png' fill alt='playlist' className="object-cover"/>
                </div>

                <div className="flex flex-col gap-y-2 mt-4 md:mt-0">
                    <p className="hidden md:block font-semibold text-sm">Playlist</p>
                    <h1 className="text-white text-4xl sm:text-5xl lg:7xl font-bold">Liked songs</h1>
                </div>
            </div>
        </div>
      </Header>
      <LikedContent likedSongs={likedSongs}/>
    </div>
  )
}

export default Liked
