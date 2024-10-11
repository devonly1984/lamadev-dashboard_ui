import Menu from "@/components/layout/Menu"
import Navbar from "@/components/layout/Navbar"
import Image from "next/image"
import Link from "next/link"
import { ReactNode } from "react"

const DashboardLayout = ({
  children }: Readonly<{ children: ReactNode }>
) => {
  return (
    <div className="h-screen flex">
      {/**Left */}
      <div className="w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%]"><Link href="/" className="flex items-center justify-center gap-2 lg:justify-start p-4">
        <Image src="/logo.png" alt="logo" width={32} height={32} />
        <span className="hidden lg:block">SchoolLama</span>
        </Link>
        <Menu/>
        </div>
        
      {/**Right */}
      <div className="w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%] overflow-scroll">
        <Navbar/>
        {children}
      </div>
    </div>

  )
}
export default DashboardLayout
