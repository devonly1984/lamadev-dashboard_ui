import Image from "next/image"
import Link from "next/link"
import {menuItems} from '@/constants'
import { currentUser } from "@clerk/nextjs/server"

const Menu = async () => {
  const user = await currentUser()
  const role = user?.publicMetadata.role as string;
  return (
    <div className="mt-4 text-sm">
      {menuItems.map((i) => (
        <div className="flex flex-col gap-2" key={i.title}>
          <span className="hidden lg:block font-light text-gray-400">
            {i.title}
          </span>
          {i.items.map((item) => {
            if (item.visible.includes(role)) {
              return (
                <Link
                  href={item.href}
                  key={item.label}
                  className="flex items-center justify-center lg:justify-start gap-4 text-gray-500 py-2 rounded-md hover:bg-lamaSkyLight md:px-2"
                >
                  <Image src={item.icon} alt="" width={20} height={20} />
                  <span className="hidden lg:block">{item.label}</span>
                </Link>
              );
            }
          })}
          ;
        </div>
      ))}
    </div>
  );
}
export default Menu