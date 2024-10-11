import Image from "next/image"
import Link from "next/link"
import {menuItems} from '@/constants'
const Menu = () => {
  return (
    <div className="mt-4 text-sm">{menuItems.map(i=>(
      <div className="flex flex-col gap-2" key={i.title}>
        <span className="hidden lg:block font-light text-gray-400" >{i.title}</span>
        {i.items.map(item =>(
          <Link href={item.href} key={item.label} className="flex items-center justify-center lg:justify-start gap-4 text-gray-500 p-2">
            <Image src={item.icon} alt="Menu Icons" height={20} width={20}/>
            <span className="hidden lg:block">{item.label}</span>
          </Link>
        ))}
      </div>
    ))}
    </div>
  )
}
export default Menu