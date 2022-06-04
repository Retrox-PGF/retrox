import SiteHead from '../components/SiteHead'
import Link from 'next/link'
import Image from 'next/image'

// import { loopOverData } from '../lib/pushoptimismData';

export default function Home() {
  return (
    <div>
      {/* SITE HEAD */}
      <SiteHead title="Retr0x" description="Retro-generative public goods funding"></SiteHead>
      {/* MAIN BODY */}
      <main className='grid justify-center h-screen w-screen overflow-hidden'>
        {/* MAIN GRID */}
        <div className='bg-[#070048] grid justify-center w-screen'>
          <div className='bg-[#070048] justify-content content-center grid'>
            <Image src='/logo.jpeg' width="600" height="400" className=""></Image>
          </div>
          <div className='bg-[#070048] w-full justify-center grid'>
            <Link href="/rounds">
              <a className="bg-white text-black p-4 rounded-2xl my-20 z-50 text-lg h-16">Launch app</a>
           </Link>
           {/* <button onClick={() => loopOverData(5)} className="text-white">Push data</button> */}
          </div>
        </div>
      </main>
    </div>
  )
}
