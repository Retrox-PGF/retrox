import SiteHead from '../components/SiteHead'
import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  return (
    <div className="bg-[#050346] h-screen">
      <SiteHead title="Retr0x" description="Retro-generative public goods funding"></SiteHead>

      <main className="items-center justify-center text-center p-40">
        <Image src='/logo.jpeg' width="600" height="400" className="mb-20"></Image>
        <br></br>
        <br></br>
        <br></br>
        <Link href="/rounds">
          <a className="bg-white text-black p-4 rounded-2xl mt-20 z-50 text-lg">Launch app</a>
        </Link>

      </main>
    </div>
  )
}
